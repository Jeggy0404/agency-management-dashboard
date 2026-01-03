export const memory = {
  users: [
    { _id: 'u1', name: 'Demo User', email: 'demo@agency.com', password: 'demo' }
  ],
  clients: [
    { _id: 'c1', name: 'Anna Novak', company: 'Novak Studio', email: 'anna@novak.cz' },
    { _id: 'c2', name: 'Pavel Svoboda', company: 'Svoboda Retail', email: 'pavel@svoboda.cz' },
    { _id: 'c3', name: 'Marek K.', company: 'M.K. Media', email: 'marek@mk-media.cz' }
  ],
  projects: [
    {
      _id: 'p1',
      name: 'Landing page redesign',
      description: 'Pixel-perfect landing page from Figma; responsive + performance.',
      status: 'active',
      clientId: 'c1',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      tasks: [
        { _id: 't1', title: 'Set up components + tokens', done: true },
        { _id: 't2', title: 'Implement hero + sections', done: false }
      ]
    },
    {
      _id: 'p2',
      name: 'Admin dashboard',
      description: 'CRUD screens + routing + RTK Query caching.',
      status: 'paused',
      clientId: 'c2',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      tasks: [
        { _id: 't3', title: 'API contract + mock server', done: true },
        { _id: 't4', title: 'Tables + filters', done: false }
      ]
    },
    {
      _id: 'p3',
      name: 'Brand guidelines',
      description: 'Finalize UI kit and handoff to client.',
      status: 'done',
      clientId: 'c3',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      tasks: [
        { _id: 't5', title: 'Deliver Figma library', done: true },
        { _id: 't6', title: 'Export assets', done: true }
      ]
    }
  ]
}
