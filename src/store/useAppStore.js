//link del mokki: https://095dfd9cd9fe2c61.mokky.dev
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useAppStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,
            cart: [],
            rentals: [],
            movies: [],
            apiUrl: "https://095dfd9cd9fe2c61.mokky.dev",
            login: async (email, password) => {
                try {
                    set({ isLoading: true })
                    const respuesta = await axios.get(`${get().apiUrl}/users?email=${email}&password=${password}`)

                    if (respuesta?.data?.length > 0) {
                        set({ user: respuesta?.data?.[0] })
                        Swal.fire({
                            title: '¡Bienvenido!',
                            text: `Hola ${respuesta?.data?.[0]?.name}`,
                            icon: 'success',
                            background: '#181818',
                            color: '#fff',
                            confirmButtonColor: '#E50914',
                            timer: 2000
                        })
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: "Credenciales inválidas",
                            icon: 'error',
                            background: '#181818',
                            color: '#fff',
                            confirmButtonColor: '#E50914'
                        })
                    }
                }
                catch (err) {
                    Swal.fire({
                        title: 'Error',
                        text: "Error al iniciar sesión",
                        icon: 'error',
                        background: '#181818',
                        color: '#fff',
                        confirmButtonColor: '#E50914'
                    })
                }
                finally {
                    set({ isLoading: false })
                }
            },

            logout: () => {
                set({ user: null, token: null })
                Swal.fire({
                    title: 'Sesión cerrada',
                    text: "Hasta pronto!",
                    icon: 'success',
                    background: '#181818',
                    color: '#fff',
                    confirmButtonColor: '#E50914',
                    timer: 2000
                })
            },

            hasRole: (roles) => {
                const currentUser = get().user
                if (!currentUser) return false
                if (Array.isArray(roles)) {
                    return roles.includes(currentUser.role)
                }
                return currentUser.role === roles
            },

            hasUserRentedMovie: (movieId) => {
                const user = get().user
                const rentals = get().rentals

                if (!user || !rentals) return false

                return rentals.some(rental =>
                    rental.userId === user.id && rental.movieId === movieId
                )
            },

            fetchMovies: async () => {
                try {
                    const respuesta = await axios.get(`${get().apiUrl}/movies`)
                    if (respuesta?.status === 200) {
                        set({ movies: respuesta.data })
                        return respuesta.data
                    }
                } catch (error) {
                    console.log("error: ", error)
                    return []
                }
            },

            fetchUserRentals: async () => {
                try {
                    const user = get().user
                    if (!user) return

                    const respuesta = await axios.get(`${get().apiUrl}/rentals?userId=${user.id}`)
                    if (respuesta?.status === 200) {
                        set({ rentals: respuesta.data })
                        console.log("Rentals actualizadas:", respuesta.data)
                    }
                } catch (error) {
                    console.log("error: ", error)
                }
            },

            fetchAllRentals: async () => {
                try {
                    const respuesta = await axios.get(`${get().apiUrl}/rentals`)
                    if (respuesta?.status === 200) {
                        return respuesta.data
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: "Error al obtener las rentas",
                        icon: 'error',
                        background: '#181818',
                        color: '#fff',
                        confirmButtonColor: '#E50914'
                    })
                    return []
                }
            },

            rentMovie: async (movieData) => {
                const state = get()
                const user = state.user
                const currentRentals = state.rentals
                const yaRentada = currentRentals.some(
                    rental => rental.userId === user.id && rental.movieId === movieData.id
                )
                if (yaRentada) {
                    Swal.fire({
                        title: 'Película ya rentada',
                        text: `Ya has rentado "${movieData.title}" anteriormente.`,
                        icon: 'info',
                        background: '#181818',
                        color: '#fff',
                        confirmButtonColor: '#E50914'
                    })
                    return
                }
                try {
                    set({ isLoading: true })
                    const newRental = {
                        userId: user.id,
                        userName: user.name,
                        movieId: movieData.id,
                        movieTitle: movieData.title,
                        price: movieData.price,
                        date: new Date().toISOString().split('T')[0]
                    }

                    const respuesta = await axios.post(`${get().apiUrl}/rentals`, newRental)
                    if (respuesta?.status === 201 || respuesta?.status === 200) {
                        set(state => ({
                            rentals: [...state.rentals, respuesta.data]
                        }))
                        Swal.fire({
                            title: '¡Renta exitosa!',
                            text: `Has rentado ${movieData.title}`,
                            icon: 'success',
                            background: '#181818',
                            color: '#fff',
                            confirmButtonColor: '#E50914',
                            timer: 2000
                        })
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: "No se pudo rentar la película",
                        icon: 'error',
                        background: '#181818',
                        color: '#fff',
                        confirmButtonColor: '#E50914'
                    })
                } finally {
                    set({ isLoading: false })
                }
            }
        }),
        {
            name: "streaming-store",
            storage: createJSONStorage(() => localStorage)
        }
    )
)