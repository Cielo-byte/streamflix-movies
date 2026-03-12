import { Link } from 'react-router-dom'
import { Film } from 'lucide-react'

const Page404 = () => {
    return (
        <div className="text-center py-20">
            <Film className="w-20 h-20 text-netflix-red mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
            <p className="text-xl text-gray-400 mb-8">Página no encontrada</p>
            <Link
                to="/"
                className="bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors inline-block"
            >
                Volver al inicio
            </Link>
        </div>
    )
}
export default Page404