import { getBookmarks, createBookmark, removeBookmark } from '../lib/api'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
})

describe('Bookmark API Functions', () => {
  const mockAccessToken = 'mock-access-token'
  const mockEventId = 'mock-event-id'

  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
    localStorageMock.setItem.mockImplementation(() => {})
  })

  describe('getBookmarks', () => {
    it('should fetch bookmarks successfully from localStorage', async () => {
      const mockBookmarks = ['job1', 'job2', 'job3']
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockBookmarks))

      const result = await getBookmarks(mockAccessToken)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockBookmarks)
      expect(localStorageMock.getItem).toHaveBeenCalledWith('bookmarkedJobs')
    })

    it('should return empty array when no bookmarks exist', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      const result = await getBookmarks(mockAccessToken)

      expect(result.success).toBe(true)
      expect(result.data).toEqual([])
      expect(localStorageMock.getItem).toHaveBeenCalledWith('bookmarkedJobs')
    })

    it('should handle localStorage error', async () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })

      const result = await getBookmarks(mockAccessToken)

      expect(result.success).toBe(false)
      expect(result.message).toBe('localStorage error')
    })
  })

  describe('createBookmark', () => {
    it('should create bookmark successfully', async () => {
      const existingBookmarks = ['job1', 'job2']
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingBookmarks))

      const result = await createBookmark(mockEventId, mockAccessToken)

      expect(result.success).toBe(true)
      expect(result.data).toEqual({ eventId: mockEventId, bookmarked: true })
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'bookmarkedJobs',
        JSON.stringify([...existingBookmarks, mockEventId])
      )
    })

    it('should not add duplicate bookmark', async () => {
      const existingBookmarks = ['job1', 'job2', mockEventId]
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingBookmarks))

      const result = await createBookmark(mockEventId, mockAccessToken)

      expect(result.success).toBe(true)
      expect(result.data).toEqual({ eventId: mockEventId, bookmarked: true })
      // Should not call setItem since bookmark already exists
      expect(localStorageMock.setItem).not.toHaveBeenCalled()
    })

    it('should handle localStorage error', async () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })

      const result = await createBookmark(mockEventId, mockAccessToken)

      expect(result.success).toBe(false)
      expect(result.message).toBe('localStorage error')
    })
  })

  describe('removeBookmark', () => {
    it('should remove bookmark successfully', async () => {
      const existingBookmarks = ['job1', 'job2', mockEventId]
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingBookmarks))

      const result = await removeBookmark(mockEventId, mockAccessToken)

      expect(result.success).toBe(true)
      expect(result.data).toEqual({ eventId: mockEventId, bookmarked: false })
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'bookmarkedJobs',
        JSON.stringify(['job1', 'job2'])
      )
    })

    it('should handle bookmark not found', async () => {
      const existingBookmarks = ['job1', 'job2']
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingBookmarks))

      const result = await removeBookmark(mockEventId, mockAccessToken)

      expect(result.success).toBe(true)
      expect(result.data).toEqual({ eventId: mockEventId, bookmarked: false })
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'bookmarkedJobs',
        JSON.stringify(existingBookmarks)
      )
    })

    it('should handle localStorage error', async () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })

      const result = await removeBookmark(mockEventId, mockAccessToken)

      expect(result.success).toBe(false)
      expect(result.message).toBe('localStorage error')
    })
  })
})
