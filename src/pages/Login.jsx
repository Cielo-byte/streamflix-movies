import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "../store/useAppStore"
import { Activity, Film } from "lucide-react"

const Login = () => {
    const navigate = useNavigate()
    const { login, isLoading, user } = useAppStore()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)

        const currentUser = useAppStore.getState().user
        if (currentUser) {
            navigate(currentUser.role === "admin" ? "/panel-admin" : "/movies")
        }
    }
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <Activity className="h-12 w-12 text-netflix-red animate-spin" />
            </div>
        )
    }
    return (
        <div className="max-w-md mx-auto mt-20">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <div className="flex justify-center mb-6">
                    <Film className="h-12 w-12 text-netflix-red" />
                </div>
                <h1 className="text-2xl font-bold mb-6 text-center text-white">Iniciar Sesión</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-netflix-red"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-netflix-red"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-netflix-red hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Login