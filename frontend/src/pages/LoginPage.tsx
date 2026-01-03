import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useLoginMutation } from '@/features/api/api'
import { setCredentials } from '@/features/auth/authSlice'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(4, 'Min 4 chars')
})

type FormData = z.infer<typeof schema>

export function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation() as any
  const redirectTo = useMemo(() => location.state?.from?.pathname || '/app', [location])

  const [login, { isLoading, error }] = useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: 'demo@agency.com', password: 'demo' }
  })

  const onSubmit = async (data: FormData) => {
    const res = await login(data).unwrap()
    dispatch(setCredentials(res))
    navigate(redirectTo, { replace: true })
  }

  return (
    <div>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Sign in</h2>
        <p className="text-sm text-white/70">Use demo credentials (prefilled) or your own.</p>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm text-white/80">Email</label>
          <Input className="mt-2" placeholder="you@company.com" {...register('email')} />
          {errors.email && <div className="mt-1 text-xs text-red-300">{errors.email.message}</div>}
        </div>
        <div>
          <label className="text-sm text-white/80">Password</label>
          <Input className="mt-2" type="password" placeholder="••••" {...register('password')} />
          {errors.password && <div className="mt-1 text-xs text-red-300">{errors.password.message}</div>}
        </div>

        {error && <div className="text-sm text-red-200">Invalid credentials or API not running.</div>}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Signing in…' : 'Sign in'}
        </Button>

        <div className="text-xs text-white/60">
          Backend: <span className="text-white/80">http://localhost:4000</span> (see README)
        </div>
      </form>
    </div>
  )
}
