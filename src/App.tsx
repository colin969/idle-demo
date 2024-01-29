import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import './App.css';
import { buy, click, tick } from './redux/gameSlice';
import { RootState } from './store';

function App() {
  // Get dispatch and game state
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.gameState);

  // Set up ticker
  useEffect(() => {
    const tickInterval = setInterval(() => {
      dispatch(tick());
    }, 100);

    return () => {
      clearInterval(tickInterval);
    };
  }, [dispatch]);

  // Render
  return (
    <>
      <div className='stats-column'>
        <div>Clicks: {Math.floor(gameState.clicks)}</div>
        <div>Autoclickers: {Math.floor(gameState.autoclickers)}</div>
      </div>
      <div className='button-row'>
        <Button onClick={() => dispatch(click())}>Click</Button>
        <Button onClick={() => dispatch(buy({building: 'autoclicker'}))}>Buy Autoclicker</Button>
      </div>
    </>
  )
}

export default App
