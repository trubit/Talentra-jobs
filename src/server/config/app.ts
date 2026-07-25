import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import { createSecurityMiddleware } from '../middleware/security.js';
import { createRequestLogger } from '../middleware/requestLogger.js';
import { globalErrorHandler, notFoundHandler } from '../middleware/errorHandler.js';
import healthRouter from '../routes/health.js';
import authRouter from '../modules/auth/routes/auth.routes.js';
import profileRouter from '../modules/profile/routes/profile.routes.js';
import companyRouter from '../modules/company/routes/company.routes.js';
import resumeRouter from '../modules/resume/routes/resume.routes.js';
import mediaRouter from '../modules/media/routes/media.routes.js';
import categoryRouter from '../modules/job-category/routes/job-category.routes.js';
import jobTypeRouter from '../modules/job-type/routes/job-type.routes.js';
import jobLocationRouter from '../modules/job-location/routes/job-location.routes.js';
import jobRouter from '../modules/jobs/routes/job.routes.js';
import employerJobRouter from '../modules/jobs/routes/employer-job.routes.js';
import bookmarkRouter from '../modules/job-bookmark/routes/job-bookmark.routes.js';
import adminRouter from '../modules/admin/routes/admin.routes.js';
import applicationRouter from '../modules/job-application/routes/application.routes.js';
import atsRouter from '../modules/ats/routes/ats.routes.js';
import historyRouter from '../modules/application-history/routes/history.routes.js';
import statusRouter from '../modules/application-status/routes/status.routes.js';
import statsRouter from '../routes/stats.js';
import interviewRouter from '../modules/interviews/routes/interview.routes.js';
import offerRouter from '../modules/offers/routes/offer.routes.js';
import hiringRouter from '../modules/hiring/routes/hiring.routes.js';
import employerDashboardRouter from '../modules/employer-dashboard/routes/dashboard.routes.js';
import recruitmentWorkspaceRouter from '../modules/recruitment-workspace/routes/workspace.routes.js';
import teamRouter from '../modules/team-management/routes/team.routes.js';

/**
 * Express application factory.
 * Creates and configures the Express app instance with all middleware and routes.
 * Does not start the HTTP server — that is done in index.ts.
 */
export function createApp(): Application {
  const app = express();

  // ── Request parsing ──────────────────────────────────────────────────────
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // ── HTTP Request logging ─────────────────────────────────────────────────
  app.use(createRequestLogger());

  // ── Security middleware (Helmet, CORS, Compression, Rate Limit) ──────────
  app.use(createSecurityMiddleware());

  // ── Public API Routes ───────────────────────────────────────────────────
  app.use('/api/health', healthRouter);
  app.use('/api/v1/stats', statsRouter);
  app.use('/api/v1/job-categories', categoryRouter);
  app.use('/api/v1/job-types', jobTypeRouter);
  app.use('/api/v1/job-locations', jobLocationRouter);

  // ── Domain & Auth API Routes ─────────────────────────────────────────────
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/profile', profileRouter);
  app.use('/api/v1/company', companyRouter);
  app.use('/api/v1/resume', resumeRouter);
  app.use('/api/v1/media', mediaRouter);
  app.use('/api/v1/jobs', jobRouter);
  app.use('/api/v1/employer', employerJobRouter);
  app.use('/api/v1', bookmarkRouter);
  app.use('/api/v1/admin', adminRouter);
  app.use('/api/v1/applications', applicationRouter);
  app.use('/api/v1/employer/ats', atsRouter);
  app.use('/api/v1/employer/dashboard', employerDashboardRouter);
  app.use('/api/v1/recruitment-workspace', recruitmentWorkspaceRouter);
  app.use('/api/v1/team', teamRouter);
  app.use('/api/v1/interviews', interviewRouter);
  app.use('/api/v1/offers', offerRouter);
  app.use('/api/v1/hiring', hiringRouter);
  app.use('/api/v1', historyRouter);
  app.use('/api/v1', statusRouter);

  // ── 404 → must come after all routes ────────────────────────────────────
  app.use(notFoundHandler);

  // ── Global error handler → must be last ─────────────────────────────────
  app.use(globalErrorHandler);

  return app;
}
