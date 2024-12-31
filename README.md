# TaskMaster

TaskMaster is a mobile-first task management app that allows admins to assign tasks to users and users to assign tasks to admins. It features user authentication, task assignment and management, notifications, and supports an unlimited number of users.

## User Journeys

1. [User Registration](docs/journeys/user-registration.md) - Sign up for a new account using email, phone number, or social login.
2. [User Login](docs/journeys/user-login.md) - Log in to your account to access tasks.
3. [View Assigned Tasks](docs/journeys/view-assigned-tasks.md) - View tasks assigned to you categorized by status.
4. [Create Task (User to Admin)](docs/journeys/create-task-user-to-admin.md) - Users create tasks assigned to the admin or central team.
5. [Assign Task (Admin to User)](docs/journeys/assign-task-admin-to-user.md) - Admins assign tasks to users or groups.
6. [Update Task Status](docs/journeys/update-task-status.md) - Update the status of a task as you work on it.
7. [Receive Notifications](docs/journeys/receive-notifications.md) - Get real-time notifications for new tasks and updates.
8. [Customize Notifications](docs/journeys/customize-notifications.md) - Adjust your notification settings.
9. [Filter and Search Tasks](docs/journeys/filter-search-tasks.md) - Filter and search tasks by priority, due date, or assignee.
10. [Dashboard Overview](docs/journeys/dashboard-overview.md) - View a dashboard overview of your tasks.

## External APIs

- **Supabase Authentication**: Used for user authentication, supports email, phone, and social logins.
- **ZAPT Events**: Used for sending events and receiving responses via `createEvent`.

## Environment Variables

Add these environment variables to your `.env` file:

- `COCKROACH_DB_URL`: Connection string for the database.
- `VITE_PUBLIC_APP_ID`: Your app's public ID.
- `VITE_PUBLIC_APP_ENV`: The environment the app is running in (`development`, `production`, etc.).
- `VITE_PUBLIC_SENTRY_DSN`: Your Sentry DSN for error tracking.
- `VITE_PUBLIC_UMAMI_WEBSITE_ID`: Your Umami Analytics website ID.

Ensure you have these environment variables set in `.env` file for the app to function properly.
