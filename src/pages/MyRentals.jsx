import { useEffect, useState } from "react"
import { useAppStore } from "../store/useAppStore"
import { Activity, History, DollarSign } from "lucide-react"
import axios from "axios"
import Swal from "sweetalert2"

const MyRentals = () => {
    const { user, apiUrl } = useAppStore()
    const [loading, setLoading] = useState(false)
    const [userRentals, setUserRentals] = useState([])

    useEffect(() => {
        const getUserRentals = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${apiUrl}/rentals?userId=${user.id}`)
                if (response?.status === 200) {
                    setUserRentals(response.data)
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: "Error al obtener tus rentas",
                    icon: 'error',
                    background: '#181818',
                    color: '#fff',
                    confirmButtonColor: '#E50914'
                })
            } finally {
                setLoading(false)
            }
        }

        if (user) {
            getUserRentals()
        }
    }, [user])

    const totalSpent = userRentals?.reduce((acc, item) => acc + item.price, 0)

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <Activity className="h-12 w-12 text-netflix-red animate-spin" />
            </div>
        )
    }
    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <History className="text-netflix-red" size={32} />
                <h1 className="text-3xl font-black text-white">Mis Rentas</h1>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 mb-8 flex items-center gap-4">
                <div className="bg-green-900 p-4 rounded-xl text-green-400">
                    <DollarSign size={32} />
                </div>
                <div>
                    <p className="text-gray-400 font-bold">Total Gastado</p>
                    <p className="text-3xl font-black text-white">$ {totalSpent?.toFixed(2) || 0}</p>
                </div>
            </div>

            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Película</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Fecha</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Precio</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {userRentals?.map((rental) => (
                            <tr key={rental.id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 text-white font-medium">{rental.movieTitle}</td>
                                <td className="px-6 py-4 text-gray-400">{rental.date}</td>
                                <td className="px-6 py-4 text-right text-netflix-red font-bold">${rental.price}</td>
                            </tr>
                        ))}
                        {userRentals?.length === 0 && (
                            <tr>
                                <td colSpan="3" className="px-6 py-8 text-center text-gray-400">
                                    No has rentado películas aún
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default MyRentals