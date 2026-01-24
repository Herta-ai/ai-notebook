import { afterAll, beforeAll, describe, expect, test } from 'bun:test'
import { RecordId, Table } from 'surrealdb'
import { db, initDB } from '../src/utils/db'

describe('SurrealDB Integration', () => {
  beforeAll(async () => {
    // Initialize connection
    try {
      await initDB()
    }
    catch (e) {
      console.error('Failed to initialize DB in test. Please ensure SurrealDB is running and credentials in .env are correct.')
      throw e
    }
  })

  afterAll(async () => {
    // Clean up data or close connection if needed
    // await db.delete("person"); // Optional: clean up
    await db.close()
  })

  test('should connect to database successfully', async () => {
    // Check if connection is ready
    // We can verify by checking if we can get info or ping
    try {
      const info = await db.info()
      expect(info).toBeDefined()
    }
    catch (error) {
      console.error('Connection check failed', error)
      throw error
    }
  })

  test('should perform CRUD operations', async () => {
    // 1. Create a new person with a random id
    const created = await db.create('person', {
      title: 'Founder & CEO',
      name: {
        first: 'Tobie',
        last: 'Morgan Hitchcock',
      },
      marketing: true,
    })

    // Verify creation
    // create returns created record(s). If creating one, it might be an object or single-element array depending on SDK version/usage.
    // Based on recent SDK, create('table', data) returns the record(s).
    const person = Array.isArray(created) ? created[0] : created
    expect(person).toBeDefined()
    expect(person.title).toBe('Founder & CEO')
    expect(person.id).toBeDefined()

    // 2. Update a person record with a specific id
    // Using RecordId class as requested in the example
    // Note: person.id might already be a RecordId object or a string "person:id"
    // If it's a string, we can parse it, or we can just use person.id directly.
    // To strictly follow the user's example style with RecordId:

    // Let's create a specific one for the RecordId test to be exact
    const jaimeId = new RecordId('person', 'jaime')
    // Ensure jaime exists first for a valid merge test (or merge might fail/do nothing if strict)
    // Or we just create jaime first
    await db.create(jaimeId, {
      title: 'Engineer',
      name: { first: 'Jaime', last: 'Doe' },
      marketing: false,
    })

    const updated = await db.merge(jaimeId, {
      marketing: true,
    })

    const updatedPerson = Array.isArray(updated) ? updated[0] : updated
    expect(updatedPerson.marketing).toBe(true)
    expect(updatedPerson.id.toString()).toBe(jaimeId.toString())

    // 3. Select all people records
    const people = await db.select('person')
    expect(Array.isArray(people)).toBe(true)
    expect(people.length).toBeGreaterThanOrEqual(2) // Tobie + Jaime

    // 4. Perform a custom advanced query
    // "SELECT marketing, count() FROM $tb GROUP BY marketing"
    const groups = await db.query(
      'SELECT marketing, count() FROM $tb GROUP BY marketing',
      {
        tb: new Table('person'),
      },
    )

    // Query returns an array of results.
    expect(groups).toBeDefined()

    // Clean up (Optional, but good practice for repeatable tests)
    await db.delete(jaimeId)
    await db.delete(person.id)
  })
})
