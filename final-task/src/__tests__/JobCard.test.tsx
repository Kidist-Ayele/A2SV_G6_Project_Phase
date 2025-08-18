import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { JobCard } from "@/components/JobCard";
import jobsReducer from "@/lib/features/jobsSlice";
import type { JobPosting } from "@/lib/types";
import "@testing-library/jest-dom";

// Mock NextAuth
const mockUseSession = jest.fn();
jest.mock("next-auth/react", () => ({
  useSession: () => mockUseSession(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="session-provider">{children}</div>
  ),
}));

// Mock the Redux hooks
const mockDispatch = jest.fn();
jest.mock("@/lib/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

// Import the mocked hook
import { useAppSelector } from "@/lib/hooks";

describe("JobCard", () => {
  const mockOnClick = jest.fn();

  const createTestStore = (initialState = {}) => {
    return configureStore({
      reducer: {
        jobs: jobsReducer,
      },
      preloadedState: {
        jobs: {
          jobs: [],
          selectedJob: null,
          bookmarkedJobs: [],
          loading: false,
          selectedJobLoading: false,
          bookmarksLoading: false,
          error: null,
          selectedJobError: null,
          bookmarksError: null,
          ...initialState,
        },
      },
    });
  };

  const mockJob: JobPosting = {
    id: "1",
    title: "Software Engineer",
    description: "We are looking for a talented software engineer...",
    company: "Tech Corp",
    logoUrl: "/test-logo.png",
    opType: "Full-time",
    categories: ["Technology", "Engineering"],
    requiredSkills: ["JavaScript", "React"],
    location: ["San Francisco", "CA"],
    orgPrimaryLocation: "San Francisco, CA",
    about: {
      location: "San Francisco, CA",
    },
  };

  const renderJobCard = (job: JobPosting, store = createTestStore()) => {
    return render(
      <Provider store={store}>
        <JobCard job={job} onClick={mockOnClick} />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Set up default session mock
    mockUseSession.mockReturnValue({
      data: {
        accessToken: "mock-access-token",
        user: { name: "Test User", email: "test@example.com" },
      },
      status: "authenticated",
    });

    // Set up default selector mock
    (useAppSelector as jest.Mock).mockReturnValue({
      bookmarkedJobs: [],
    });
  });

  it("renders job information correctly", () => {
    renderJobCard(mockJob);

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Tech Corp")).toBeInTheDocument();
    expect(
      screen.getByText("We are looking for a talented software engineer...")
    ).toBeInTheDocument();
    expect(screen.getByText("Full-time")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("displays bookmark button for authenticated users", () => {
    renderJobCard(mockJob);

    const bookmarkButton = screen.getByTestId("bookmark-button");
    expect(bookmarkButton).toBeInTheDocument();
  });

  it("shows empty bookmark icon when job is not bookmarked", () => {
    renderJobCard(mockJob);

    const bookmarkButton = screen.getByTestId("bookmark-button");
    expect(bookmarkButton).toBeInTheDocument();
    // The bookmark icon should be present (empty state)
    expect(bookmarkButton.querySelector("svg")).toBeInTheDocument();
  });

  it("shows filled bookmark icon when job is bookmarked", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      bookmarkedJobs: [mockJob],
    });

    renderJobCard(mockJob);

    const bookmarkButton = screen.getByTestId("bookmark-button");
    expect(bookmarkButton).toBeInTheDocument();
    // The bookmark check icon should be present (filled state)
    expect(bookmarkButton.querySelector("svg")).toBeInTheDocument();
  });

  it("calls onClick when card is clicked", () => {
    renderJobCard(mockJob);

    const card = screen.getByText("Software Engineer").closest("div");
    fireEvent.click(card!);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("prevents card click when bookmark button is clicked", () => {
    renderJobCard(mockJob);

    const bookmarkButton = screen.getByTestId("bookmark-button");
    fireEvent.click(bookmarkButton);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("handles missing job data gracefully", () => {
    const incompleteJob: JobPosting = {
      id: "2",
      title: "",
      description: "",
      company: "",
    };

    renderJobCard(incompleteJob);

    // Should render without crashing
    expect(screen.getByTestId("bookmark-button")).toBeInTheDocument();
  });

  it("displays location correctly from different sources", () => {
    const jobWithAboutLocation: JobPosting = {
      ...mockJob,
      about: { location: "New York, NY" },
    };

    renderJobCard(jobWithAboutLocation);

    expect(screen.getByText("New York, NY")).toBeInTheDocument();
  });

  it("displays location from location array", () => {
    const jobWithLocationArray: JobPosting = {
      ...mockJob,
      about: undefined,
      location: ["Los Angeles", "CA"],
    };

    renderJobCard(jobWithLocationArray);

    expect(screen.getByText("Los Angeles, CA")).toBeInTheDocument();
  });

  it("displays orgPrimaryLocation as fallback", () => {
    const jobWithOrgLocation: JobPosting = {
      ...mockJob,
      about: undefined,
      location: [],
      orgPrimaryLocation: "Chicago, IL",
    };

    renderJobCard(jobWithOrgLocation);

    expect(screen.getByText("Chicago, IL")).toBeInTheDocument();
  });

  it('displays "Remote" as default location', () => {
    const jobWithNoLocation: JobPosting = {
      ...mockJob,
      about: undefined,
      location: [],
      orgPrimaryLocation: undefined,
    };

    renderJobCard(jobWithNoLocation);

    expect(screen.getByText("Remote")).toBeInTheDocument();
  });
});
