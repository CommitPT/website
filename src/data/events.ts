export type EventFrequency = 'weekly' | 'monthly'
export type EventAccess = 'Commit+' | 'Free'

export interface CommunityEvent {
  title: string
  description: string
  frequency: EventFrequency
  access: EventAccess
}

export const events: CommunityEvent[] = [
  {
    title: 'Commit Sessions',
    description:
      'Open calls for technical discussions covering Frontend, Backend, Cloud, AI, Cybersecurity, DevOps, and System Design, with a strong focus on practical knowledge.',
    frequency: 'weekly',
    access: 'Commit+',
  },
  {
    title: 'Commit Projects',
    description:
      'Build real-world projects as part of a team, with planning sessions, issue pulls, code reviews, and demos. Gain hands-on experience with workflows similar to those used by professional engineering teams.',
    frequency: 'weekly',
    access: 'Commit+',
  },
  {
    title: 'Commit Career',
    description:
      'Sessions focused on professional growth, covering CVs, portfolios, LinkedIn, interviews, salary negotiation, the job market, and strategies for landing your first role or progressing in your career.',
    frequency: 'weekly',
    access: 'Commit+',
  },
  {
    title: 'Commit Beginners',
    description:
      'A space designed for people taking their first steps in programming. Learn the fundamentals, ask questions, and start building your first projects with support from the community.',
    frequency: 'monthly',
    access: 'Free',
  },
  {
    title: 'Commit Talks',
    description:
      'Sessions with external industry professionals about career, software engineering, programming, AI, and much more.',
    frequency: 'monthly',
    access: 'Commit+',
  },
]
