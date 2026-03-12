import { useAppStore } from "../store/useAppStore"
import { User, Mail, Shield, Calendar } from "lucide-react"

const Profile = () => {
    const { user } = useAppStore()
    if (!user) return null

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-white">Mi Perfil</h1>
            
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-netflix-red rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                        <p className="text-gray-400">{user.email}</p>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6">
                    <h3 className="font-semibold text-white mb-4">Información de cuenta</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400">Email</span>
                            </div>
                            <span className="text-white">{user.email}</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <Shield className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400">Rol</span>
                            </div>
                            <span className="text-white capitalize">{user.role}</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400">Miembro desde</span>
                            </div>
                            <span className="text-white">2024</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile