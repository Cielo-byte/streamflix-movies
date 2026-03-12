import { useEffect, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import MovieCard from '../components/MovieCard'
import { Activity, Film } from 'lucide-react'

const Movies = () => {
    const { movies, fetchMovies } = useAppStore()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true)
            await fetchMovies()
            setLoading(false)
        }
        loadMovies()
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <Activity className="h-12 w-12 text-netflix-red animate-spin" />
            </div>
        )
    }
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 flex items-center">
                <Film className="text-netflix-red mr-3" size={32} />
                Catálogo de Películas
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}
export default Movies