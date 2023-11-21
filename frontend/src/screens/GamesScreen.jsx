import React, { useEffect, useState, useRef } from 'react'
import {
  useQuery,
} from '@tanstack/react-query'
import { MIRAPLAY_API_ROUTE } from '../constants/routes'
import gameGenres from '../constants/gameGenres'
import SecondaryButton from '../components/ui/SecondaryButton'
import PrimaryButton from '../components/ui/PrimaryButton'
import GameCard from '../components/ui/GameCard'
import { toast } from 'react-toastify'
import Select from '../components/Select'

export default function GamesScreen() {

  const GAMES_TO_SHOW = 9;
  const SORT_VALUES = ['Newest', 'Oldest']
  const [gamesToShow, setGamesToShow] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentGenre, setCurrentGenre] = useState(gameGenres[0])
  const [totalPages, setTotalPages] = useState(1)
  const [sortValue, setSortValue] = useState(SORT_VALUES[0]);
  const container = useRef(null);

  const fetchGames = (page, genre, sort) => fetch(MIRAPLAY_API_ROUTE, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "page": page,
      "isFreshGamesFirst": sort === 'Newest',
      "genre": genre === 'ALL' ? false : currentGenre,
      "gamesToShow": GAMES_TO_SHOW
    })
  }).then((res) => res.json())

  const scrollToBottom = () => container.current.scrollIntoView({ behavior: "smooth", block: "end" })
  const switchSort = (value) => setSortValue(value)

  const {data, error, isLoading} = useQuery({ 
    queryKey: ['games', currentPage, currentGenre, sortValue], 
    queryFn: () => fetchGames(currentPage, currentGenre, sortValue),
  })

  useEffect(() => {
    if(data && data.gamesListLength) setTotalPages(Math.ceil(data.gamesListLength / GAMES_TO_SHOW))
    if(data && data.games) setGamesToShow([...data.games])
  }, [data])

  useEffect(() => {
    error && toast.error(error?.data?.message || error.error);
  }, [error])

  useEffect(() => {
    if(gamesToShow.length > GAMES_TO_SHOW) scrollToBottom()
  }, [gamesToShow])

  return (
    <section className='w-full px-8 py-10 h-full bg-miraplayMainBg flex' ref={container}>
      <div className='flex flex-col max-w-[1175px] mx-auto'>
        <span className='text-miraplayMainText mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl'>ALL GAMES</span>
        <div className='flex justify-between items-start'>
          <div className='flex flex-wrap gap-2.5 w-7/12 mb-8'>
            {gameGenres.map(genre => (
              genre === currentGenre ? (
                <PrimaryButton 
                  key={genre} 
                  text={genre} 
                  className="font-extrabold mr-0" 
                />
              ):(
                <SecondaryButton 
                  key={genre}
                  onClick={() => {
                    setCurrentGenre(genre)
                    setCurrentPage(1)
                  }}
                  text={genre}
                  className="bg-[#242424] font-extrabold mr-0" 
                />
              )
            ))}
          </div>
          <Select options={SORT_VALUES} setSelectedItem={switchSort} />
        </div>
        {isLoading && <h2 className='text-2xl text-miraplayMainText'>Loading...</h2>}
        {!isLoading && gamesToShow && gamesToShow.length > 0 && (
          <ul className='flex flex-wrap gap-8 mb-12'>
            {gamesToShow.map(game => <GameCard key={game['_id']} game={game} />)}
          </ul>
        )}
        {currentPage < totalPages && (
          <SecondaryButton 
            text='Load more' 
            onClick={() => setCurrentPage(prev => prev + 1)} 
            className="w-[370px] h-[78px] border-1 border-[#454545] bg-[#242424] mx-auto font-extrabold cursor-pointer rounded-3xl"
          />
        )}
      </div>
    </section>
  )
}
