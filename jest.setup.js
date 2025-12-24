// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/",
      query: {},
      asPath: "/",
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

// Mock Clerk
jest.mock("@clerk/nextjs", () => ({
  useAuth: jest.fn(() => ({
    isLoaded: true,
    isSignedIn: true,
    getToken: jest.fn().mockResolvedValue("mock-token"),
  })),
  SignInButton: ({ children }) => children,
  UserButton: () => <div>UserButton</div>,
}));

// Global test setup
global.fetch = jest.fn();
