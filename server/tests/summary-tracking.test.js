const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const app = require('../src/index');

const prisma = new PrismaClient();

describe('Summary View and Download Tracking Tests', () => {
  let authToken;
  let userId;
  let summaryId;
  let courseId;

  beforeAll(async () => {
    // Create a test user
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        fullName: 'View Test User',
        email: `view-test-${Date.now()}@example.com`,
        password: 'password123'
      });

    authToken = userRes.body.token;
    userId = userRes.body.user.id;

    // Create or get a test course
    const course = await prisma.course.upsert({
      where: { courseCode: 'TEST102' },
      update: {},
      create: {
        courseCode: 'TEST102',
        courseName: 'Test Course for Views',
        institution: 'Test University',
        semester: 'Fall 2024'
      }
    });
    courseId = course.id;

    // Create a test summary
    const summary = await prisma.summary.create({
      data: {
        title: 'Test Summary for View Tracking',
        description: 'This is a test summary',
        filePath: 'test-view.pdf',
        courseId: courseId,
        uploadedById: userId
      }
    });
    summaryId = summary.id;
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.summary.deleteMany({ where: { id: summaryId } });
    await prisma.user.deleteMany({ where: { id: userId } });
    await prisma.$disconnect();
  });

  test('Should increment view count when viewing a summary', async () => {
    // Get initial view count
    const initialSummary = await prisma.summary.findUnique({
      where: { id: summaryId },
      select: { viewCount: true }
    });

    // View the summary
    await request(app)
      .get(`/api/summaries/${summaryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    // Get updated view count
    const updatedSummary = await prisma.summary.findUnique({
      where: { id: summaryId },
      select: { viewCount: true }
    });

    // Verify view count increased
    expect(updatedSummary.viewCount).toBe((initialSummary.viewCount || 0) + 1);
  });

  test('Should not increment view count within cooldown period', async () => {
    // View the summary first time
    await request(app)
      .get(`/api/summaries/${summaryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    // Get view count after first view
    const firstViewSummary = await prisma.summary.findUnique({
      where: { id: summaryId },
      select: { viewCount: true }
    });

    // View again immediately
    await request(app)
      .get(`/api/summaries/${summaryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    // Get view count after second view
    const secondViewSummary = await prisma.summary.findUnique({
      where: { id: summaryId },
      select: { viewCount: true }
    });

    // Verify view count did not increase (due to cooldown)
    expect(secondViewSummary.viewCount).toBe(firstViewSummary.viewCount);
  });

  test('Should increment download count when downloading a summary', async () => {
    // Get initial download count
    const initialSummary = await prisma.summary.findUnique({
      where: { id: summaryId },
      select: { downloadCount: true }
    });

    // Download the summary
    await request(app)
      .get(`/api/summaries/${summaryId}/download`)
      .set('Authorization', `Bearer ${authToken}`);

    // Get updated download count
    const updatedSummary = await prisma.summary.findUnique({
      where: { id: summaryId },
      select: { downloadCount: true }
    });

    // Verify download count increased
    expect(updatedSummary.downloadCount).toBe((initialSummary.downloadCount || 0) + 1);
  });

  test('Should include viewCount and downloadCount in summary response', async () => {
    const response = await request(app)
      .get(`/api/summaries/${summaryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('viewCount');
    expect(response.body).toHaveProperty('downloadCount');
    expect(typeof response.body.viewCount).toBe('number');
    expect(typeof response.body.downloadCount).toBe('number');
  });
});
