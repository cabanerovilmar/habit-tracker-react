import { describe, it, expect, afterEach } from 'vitest'
import { getCurrentTask, isTimeInRange, parseTime } from '../getCurrentTask'
import tasks from './utils/mockTasks.json'

const mockDate = (dateString: string): void => {
  const date = new Date(dateString)

  global.Date = class extends Date {
    constructor(...args: ConstructorParameters<typeof Date>) {
      if (args.length) {
        super(...args)
      } else {
        return date
      }
    }
  } as typeof Date
}

describe('getCurrentTask', () => {
  afterEach(() => {
    global.Date = Date
  })

  describe('correctly handles tasks that have more than one shift within the same day', () => {
    it('returns "Work" during the first shfit', () => {
      mockDate('2024-09-23T10:00:00') // Monday
      expect(getCurrentTask(tasks)).toBe('Work')
    })

    it('returns "Work" during the second shfit', () => {
      mockDate('2024-09-23T14:00:00') // Monday
      expect(getCurrentTask(tasks)).toBe('Work')
    })

    it('returns "Work" during the third shfit', () => {
      mockDate('2024-09-23T22:59:00') // Monday
      expect(getCurrentTask(tasks)).toBe('Work')
    })
  })

  describe('correctly handles tasks that appear all week but different week days and weekends schedule', () => {
    it('returns Morning Preparation - Breakfast on Monday', () => {
      mockDate('2024-09-23T08:40:00') // Monday
      expect(getCurrentTask(tasks)).toBe('Morning Preparation - Breakfast')
    })

    it('returns Morning Preparation - Breakfast on Saturday', () => {
      mockDate('2024-09-28T09:40:00') // Saturday
      expect(getCurrentTask(tasks)).toBe('Morning Preparation - Breakfast')
    })
  })

  describe('returns the task name at the exact start time', () => {
    it('returns Break - Lunch on Monday', () => {
      mockDate('2024-09-23T12:00:00') // Monday
      expect(getCurrentTask(tasks)).toBe('Break - Lunch')
    })

    it('returns Break - Lunch on Saturday', () => {
      mockDate('2024-09-28T12:00:00') // Saturday
      expect(getCurrentTask(tasks)).toBe('Break - Lunch')
    })

    it('returns Self-care - Take a Bath & Grooming on Saturday', () => {
      mockDate('2024-09-28T12:30:00') // Saturday
      expect(getCurrentTask(tasks)).toBe('Self-care - Take a Bath & Grooming')
    })

    it('returns Rest on Tuesday', () => {
      mockDate('2024-09-24T20:00:00') // Tuesday
      expect(getCurrentTask(tasks)).toBe('Rest')
    })

    it('returns Morning Preparation - Breakfast on Monday', () => {
      mockDate('2024-09-23T08:30:00') // Monday
      expect(getCurrentTask(tasks)).toBe('Morning Preparation - Breakfast')
    })

    it('returns Morning Preparation - Breakfast on Saturday', () => {
      mockDate('2024-09-28T09:30:00') // Saturday
      expect(getCurrentTask(tasks)).toBe('Morning Preparation - Breakfast')
    })

    it('returns Personal Development - Codewars on Tuesday', () => {
      mockDate('2024-09-24T09:00:00') // Tuesday
      expect(getCurrentTask(tasks)).toBe('Personal Development - Codewars')
    })

    it('returns Personal Development - JavaScript Book on Tuesday', () => {
      mockDate('2024-09-28T10:00:00') // Sunday
      expect(getCurrentTask(tasks)).toBe('Personal Development - JavaScript Book')
    })
  })

  describe('correctly handles tasks that span past midnight', () => {
    it('returns "Sleep" during sleep hours before midnight', () => {
      mockDate('2024-09-22T23:40:00') // Sunday
      expect(getCurrentTask(tasks)).toBe('Sleep')
    })

    it('returns "Sleep" during sleep hours after midnight', () => {
      mockDate('2024-09-23T00:40:00') // Monday
      expect(getCurrentTask(tasks)).toBe('Sleep')
    })
  })
})

describe('parseTime', () => {
  it('parses valid time formats correctly', () => {
    expect(parseTime('08:30')).toBe(510)
    expect(parseTime('12:00')).toBe(720)
    expect(parseTime('23:59')).toBe(1439)
  })

  /* Not yet implemented 
  it('throws an error for invalid time formats', () => {
    expect(() => parseTime('8:30')).toThrowError()
    expect(() => parseTime('08:3')).toThrowError()
    expect(() => parseTime('abc')).toThrowError()
  }) */

  it('handles edge cases correctly', () => {
    expect(parseTime('00:00')).toBe(0)
    expect(parseTime('23:59')).toBe(1439)
  })
})

describe('isTimeInRange', () => {
  it('should return true when time is within range', () => {
    const currentTime = 10 * 60 + 30 // 10:30
    const start = '10:00'
    const end = '11:00'
    expect(isTimeInRange(currentTime, start, end)).toBe(true)
  })

  it('should return false when time is outside range', () => {
    const currentTime = 12 * 60 + 30 // 12:30
    const start = '10:00'
    const end = '11:00'
    expect(isTimeInRange(currentTime, start, end)).toBe(false)
  })

  it('should return true when time is at start of range', () => {
    const currentTime = 10 * 60 // 10:00
    const start = '10:00'
    const end = '11:00'
    expect(isTimeInRange(currentTime, start, end)).toBe(true)
  })

  it('should return false when time is at end of range', () => {
    const currentTime = 11 * 60 // 11:00
    const start = '10:00'
    const end = '11:00'
    expect(isTimeInRange(currentTime, start, end)).toBe(false)
  })

  it('should return true when time spans past midnight', () => {
    const currentTime = 23 * 60 + 30 // 23:30
    const start = '22:00'
    const end = '01:00'
    expect(isTimeInRange(currentTime, start, end)).toBe(true)
  })

  /* Not yet implemented 
  it('should throw error when input is invalid', () => {
    const currentTime = 10 * 60 + 30 // 10:30
    const start = 'abc'
    const end = '11:00'
    expect(() => isTimeInRange(currentTime, start, end)).toThrowError()
  }) */
})
