import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppStore } from '../store/useAppStore'
import { Star, Calendar, ShoppingCart, ArrowLeft, Clock,
        User, Globe, Users, Play, Check } from 'lucide-react'
import Swal from 'sweetalert2'

const MovieDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, apiUrl, rentMovie, isLoading, rentals, fetchUserRentals } = useAppStore()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isRented, setIsRented] = useState(false)
    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${apiUrl}/movies/${id}`)
                console.log("Película cargada:", response.data)
                setMovie(response.data)
            } catch (error) {
                console.error("Error al cargar película:", error)
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo cargar la información de la película',
                    icon: 'error',
                    background: '#181818',
                    color: '#fff',
                    confirmButtonColor: '#E50914'
                })
                navigate('/movies')
            } finally {
                setLoading(false)
            }
        }        
        if (id) {
            fetchMovie()
        }
    }, [id, apiUrl, navigate])

    useEffect(() => {
        if (user) {
            fetchUserRentals()
        }
    }, [user, id])  

    useEffect(() => {
        if (user && movie && rentals) {
            const yaRentada = rentals.some(
                rental => rental.userId === user.id && rental.movieId === movie.id
            )
            setIsRented(yaRentada)
            console.log("¿Ya rentada?", yaRentada, "Rentals actuales:", rentals)
        }
    }, [user, movie, rentals])

    const handleRent = async () => {
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

        if (isRented) {
            Swal.fire({
                title: 'Película ya rentada',
                text: 'Ya has rentado esta película anteriormente',
                icon: 'info',
                background: '#181818',
                color: '#fff',
                confirmButtonColor: '#E50914'
            })
            return
        }        
        await rentMovie(movie)
        await fetchUserRentals()
    }
    
    const handleWatchTrailer = () => {
        if (movie?.trailer) {
            window.open(movie.trailer, '_blank')
        } else {
            Swal.fire({
                title: 'No disponible',
                text: 'El trailer no está disponible por el momento',
                icon: 'info',
                background: '#181818',
                color: '#fff',
                confirmButtonColor: '#E50914'
            })
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-netflix-red"></div>
                <p className="mt-4 text-gray-400">Cargando...</p>
            </div>
        )
    }

    if (!movie) return null
    return (
        <div className="max-w-6xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors group"
            >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Volver a películas
            </button>
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
                <div className="flex flex-col lg:flex-row">
                    
                    <div className="lg:w-2/5 relative">
                        <div className="aspect-2/3 lg:aspect-auto lg:h-full">
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="absolute top-4 left-4 bg-netflix-red text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                            {movie.category}
                        </div>

                        {movie.trailer && (
                            <button
                                onClick={handleWatchTrailer}
                                className="absolute bottom-4 right-4 bg-black bg-opacity-70 hover:bg-opacity-100 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center transition-all"
                            >
                                <Play className="w-4 h-4 mr-2 text-red-600" />
                                Ver Trailer
                            </button>
                        )}
                    </div>

                    <div className="lg:w-3/5 p-8 lg:p-12">
                        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
                            {movie.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-full">
                                <Star className="w-5 h-5 mr-2 fill-current" />
                                <span className="font-bold">{movie.rating}</span>
                                <span className="text-gray-400 ml-1">/10</span>
                            </div>
                            <div className="flex items-center bg-gray-800 text-gray-300 px-4 py-2 rounded-full">
                                <Calendar className="w-5 h-5 mr-2" />
                                <span>{movie.year}</span>
                            </div>
                            <div className="flex items-center bg-gray-800 text-gray-300 px-4 py-2 rounded-full">
                                <Clock className="w-5 h-5 mr-2" />
                                <span>{movie.duration || "120 min"}</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-white mb-3">Sinopsis</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {movie.description || "Sin descripción disponible"}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-gray-800/50 p-4 rounded-xl">
                                <div className="flex items-center text-gray-400 mb-1">
                                    <User className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Director</span>
                                </div>
                                <p className="text-white font-semibold">{movie.director || "Información no disponible"}</p>
                            </div>

                            <div className="bg-gray-800/50 p-4 rounded-xl">
                                <div className="flex items-center text-gray-400 mb-1">
                                    <Globe className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Idioma</span>
                                </div>
                                <p className="text-white font-semibold">{movie.language || "Español"}</p>
                            </div>

                            <div className="bg-gray-800/50 p-4 rounded-xl md:col-span-2">
                                <div className="flex items-center text-gray-400 mb-1">
                                    <Users className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Reparto principal</span>
                                </div>
                                <p className="text-white font-semibold">
                                    {movie.cast?.join(" • ") || "Información no disponible"}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-gray-800">
                            <div>
                                <span className="text-gray-400 text-sm block mb-1">Precio de renta</span>
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-black text-netflix-red">
                                        ${movie.price}
                                    </span>
                                    <span className="text-gray-400 ml-2">/ por 48 horas</span>
                                </div>
                            </div>
                            
                            <div className="flex w-full sm:w-auto gap-3">
                                {isRented ? (
                                    <button
                                        disabled
                                        className="flex-1 sm:flex-none bg-gray-700 text-gray-400 px-8 py-3 rounded-xl font-semibold flex items-center justify-center cursor-not-allowed"
                                    >
                                        <Check className="w-5 h-5 mr-2" />
                                        Ya rentada
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleRent}
                                        disabled={isLoading}
                                        className="flex-1 sm:flex-none bg-netflix-red hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center justify-center"
                                    >
                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                        Rentar
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 text-sm text-gray-500">
                            <p>Al rentar, tendrás acceso por 48 horas para ver la película las veces que quieras.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {movie.category && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Películas similares</h2>
                    <p className="text-gray-400">Próximamente: recomendaciones basadas en {movie.category}</p>
                </div>
            )}
        </div>
    )
}
export default MovieDetail