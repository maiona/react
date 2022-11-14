import './App.css';
import { useState } from 'react';

const Scrabble = () => {
  const [words, setWords] = useState('');
  const [tiles, setTiles] = useState('');
  const [result, setResult] = useState('');

  const handleWordsChange = (event) => {
    setWords(event.target.value);
  };

  const handleTilesChange = (event) => {
    setTiles(event.target.value);
  };

  const buildTileMap = (tiles) => {
    const tilesMap = new Map();
    tiles.split('').forEach((tile) => {
      if (tilesMap.has(tile)) {
        tilesMap.set(tile, tilesMap.get(tile) + 1);
      } else {
        tilesMap.set(tile, 1);
      }
    });

    return tilesMap;
  }

  const handleButtonClick = (event) => {
    let found = '';
    let wordList = words.split(',');
    const tilesMap = buildTileMap(tiles);
    let maxLength = 0;

    

    wordList.forEach((word) => {
      const auxTiles = new Map(tilesMap);
      if (word.length < maxLength) {
        return;
      }

      let canWrite = true;

      word.split('').every((character) => {
        const numTilesLeft = auxTiles.get(character);
        if (numTilesLeft !== undefined && numTilesLeft > 0) {
          auxTiles.set(character, auxTiles.get(character) - 1);
          return true;
        }
        canWrite = false;
        return false;
      });

      if (canWrite) {
        // Word can be written with given tiles
        if (maxLength < word.length) {
          maxLength = word.length;
          found = '';
        }

        if (found !== '') {
          found += ', ';
        }

        found += word;
      }

      setResult(found);
    });
  };

  return (
    <div className='App'>
      <p>List of words (comma separated):</p>
      <textarea
        id='words'
        value={words}
        onChange={handleWordsChange}
      ></textarea>
      <p>Tiles (no spaces)</p>
      <input
        type='text'
        id='tiles'
        onChange={handleTilesChange}
        value={tiles}
      ></input>
      <br />
      <br />
      <button id='btnFindWords' onClick={handleButtonClick}>
        Find!
      </button>
      <br />
      <br />
      <p>Words found: {result}</p>
    </div>
  );
};

export default Scrabble;
