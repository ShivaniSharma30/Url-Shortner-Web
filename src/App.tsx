import { useAppSelector } from './store/hooks'

function App() {
  const { apiKey, tenant, status } = useAppSelector((state) => state.auth)

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-lg">
        <div className="card-body items-center text-center">
          <h1 className="card-title text-2xl text-primary">Redux Connected</h1>
          <p className="text-sm">Status: {status}</p>
          <p className="text-sm">Logged in: {apiKey ? 'Yes' : 'No'}</p>
          <p className="text-sm">Tenant: {tenant?.name ?? 'None'}</p>
        </div>
      </div>
    </div>
  )
}

export default App
