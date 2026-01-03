import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '@/app/store'
import type { Client, Project, ProjectDetails, User } from '@/types/models'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) headers.set('authorization', `Bearer ${token}`)
    headers.set('content-type', 'application/json')
    return headers
  }
})

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Me', 'Projects', 'Project', 'Clients'],
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; user: User }, { email: string; password: string }>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      invalidatesTags: ['Me']
    }),
    me: builder.query<User, void>({
      query: () => ({ url: '/auth/me' }),
      providesTags: ['Me']
    }),
    projects: builder.query<Project[], { q?: string; status?: string; page?: number }>({
      query: (params) => {
        const sp = new URLSearchParams()
        if (params.q) sp.set('q', params.q)
        if (params.status) sp.set('status', params.status)
        if (params.page) sp.set('page', String(params.page))
        return { url: `/projects?${sp.toString()}` }
      },
      providesTags: (result) =>
        result
          ? [{ type: 'Projects' as const, id: 'LIST' }, ...result.map((p) => ({ type: 'Project' as const, id: p._id }))]
          : [{ type: 'Projects' as const, id: 'LIST' }]
    }),
    projectById: builder.query<ProjectDetails, string>({
      query: (id) => ({ url: `/projects/${id}` }),
      providesTags: (r, e, id) => [{ type: 'Project', id }]
    }),
    updateProjectStatus: builder.mutation<Project, { id: string; status: Project['status'] }>({
      query: ({ id, status }) => ({ url: `/projects/${id}`, method: 'PATCH', body: { status } }),
      invalidatesTags: (r, e, a) => [{ type: 'Project', id: a.id }, { type: 'Projects', id: 'LIST' }]
    }),
    clients: builder.query<Client[], void>({
      query: () => ({ url: '/clients' }),
      providesTags: ['Clients']
    })
  })
})

export const {
  useLoginMutation,
  useMeQuery,
  useProjectsQuery,
  useProjectByIdQuery,
  useUpdateProjectStatusMutation,
  useClientsQuery
} = api
