import axios from "axios"
import { useAppStore } from "../store/useAppStore"
import { useEffect, useState } from "react"
import { Activity, DollarSign, ShieldAlert } from "lucide-react"
import Swal from "sweetalert2"
import TableGeneral from "../components/TableGeneral"

const PanelAdmin = () => {
    const { apiUrl } = useAppStore()
    const [purchasesAll, setPurchasesAll] = useState([])
    const [loading, setLoading] = useState(false)

    const totalAmount = purchasesAll?.reduce((acc, item) => {
        return acc + item?.price
    }, 0)

    useEffect(() => {
        const fetchPurchasesAll = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${apiUrl}/rentals`)
                if (response?.status === 200) {
                    setPurchasesAll(response?.data)
                }
            }
            catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: "Hubo un error al momento de traer las rentas",
                    icon: 'error',
                    background: '#181818',
                    color: '#fff',
                    confirmButtonColor: '#E50914'
                })
            }
            finally {
                setLoading(false)
            }
        }
        fetchPurchasesAll()
    }, [])
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
                <ShieldAlert className="text-netflix-red" size={32} />
                <h1 className="text-3xl font-black text-white">Panel de Control Global</h1>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 mb-8 flex items-center gap-4">
                <div className="bg-green-900 p-4 rounded-xl text-green-400">
                    <DollarSign size={32} />
                </div>
                <div>
                    <p className="text-gray-400 font-bold">Ingresos Totales</p>
                    <p className="text-3xl font-black text-white">$ {totalAmount.toFixed(2)}</p>
                </div>
            </div>
            
            <div className="mt-3 bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
                <TableGeneral data={purchasesAll} tableType={"panelAdmin"} />
            </div>
        </div>
    )
}
export default PanelAdmin