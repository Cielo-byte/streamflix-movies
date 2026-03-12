import { Calendar, Film, User } from "lucide-react"

const TableGeneral = ({ data, tableType }) => {
    
    if (tableType === "panelAdmin") {
        return (
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Usuario</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Película</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Fecha</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Precio</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {data?.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-300">{item.userName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Film className="w-4 h-4 text-gray-500" />
                                        <span className="text-white font-medium">{item.movieTitle}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-400">{item.date}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-netflix-red font-bold">${item.price}</span>
                                </td>
                            </tr>
                        ))}
                        {data?.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                                    No hay rentas registradas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
    return null
}
export default TableGeneral