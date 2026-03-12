import { useEffect, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Activity, Film, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const { fetchMovies, movies } = useAppStore()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            await fetchMovies()
            setLoading(false)
        }
        loadData()
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-netflix-red"></div>
                <p className="mt-6 text-xl text-gray-400">Cargando...</p>
            </div>
        )
    }
    return (
        <div className="space-y-12">
            <section className="relative h-[100vh] min-h-100 rounded-2xl overflow-hidden mb-16">
                <img
                    src="https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/netflixteaser.png"
                    alt="Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent">
                    <div className="container-custom h-full flex items-center">
                        <div className="max-w-3xl">
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 animate-fade-in">
                                StreamFlix
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                                Las mejores películas en un solo lugar. 
                                <br />Rentas desde $4.99 por 48 horas.
                            </p>
                            <button
                                onClick={() => navigate('/movies')}
                                className="group bg-netflix-red hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center"
                            >
                                Explorar el catálogo
                                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <div className="flex gap-8 mt-12">
                                <div>
                                    <p className="text-3xl font-bold text-white">{movies.length}+</p>
                                    <p className="text-gray-400">Películas</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">4.99$</p>
                                    <p className="text-gray-400">Desde</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">48h</p>
                                    <p className="text-gray-400">de acceso</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-custom py-10 border-t border-gray-800">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    <div className="flex items-center gap-3">
                        <div className="bg-netflix-red/20 p-3 rounded-full">
                            <Film className="w-6 h-6 text-netflix-red" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Amplio catálogo</h3>
                            <p className="text-sm text-gray-400">20+ películas</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-netflix-red/20 p-3 rounded-full">
                            <svg className="w-6 h-6 text-netflix-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Renta por 48h</h3>
                            <p className="text-sm text-gray-400">Disfruta 2 días</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-netflix-red/20 p-3 rounded-full">
                            <svg className="w-6 h-6 text-netflix-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">HD Quality</h3>
                            <p className="text-sm text-gray-400">Alta definición</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Home