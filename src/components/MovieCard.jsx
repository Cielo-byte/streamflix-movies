import { useState } from 'react'
import { ShoppingCart, Star, Plus, Info } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useNavigate } from 'react-router-dom'  
import Swal from 'sweetalert2'

const MovieCard = ({ movie }) => {
    const navigate = useNavigate() 
    const { user, rentMovie, isLoading } = useAppStore()
    const [loading, setLoading] = useState(false)

    const handleRent = async (e) => {
        e.stopPropagation()
        if (!user) {
            Swal.fire({
                title: 'Inicia sesión',
                text: 'Debes iniciar sesión para rentar películas',
                icon: 'info',
                background: '#181818',
                color: '#fff',
                confirmButtonColor: '#E50914'
            })
            return
        }
        await rentMovie(movie)
    }
    const handleCardClick = () => {
        navigate(`/movie/${movie.id}`)
    }
    const handleInfoClick = (e) => {
        e.stopPropagation()
        navigate(`/movie/${movie.id}`)
    }
    return (
        <div 
            className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={handleCardClick}
        >
            <img 
                src={movie.image} 
                alt={movie.title} 
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white truncate flex-1">{movie.title}</h3>
                    <button 
                        onClick={handleInfoClick}
                        className="text-gray-400 hover:text-white transition-colors ml-2"
                        title="Ver detalles"
                    >
                        <Info className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                    <span className="text-yellow-500 flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        {movie.rating}
                    </span>
                    <span className="text-netflix-red font-bold">${movie.price}</span>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={handleRent}
                        disabled={isLoading}
                        className="flex-1 bg-netflix-red hover:bg-red-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center"
                    >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Rentar
                    </button>
                </div>
            </div>
        </div>
    )
}
export default MovieCard