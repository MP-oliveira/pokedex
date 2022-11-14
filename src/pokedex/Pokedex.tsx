import React, { useEffect, useState } from 'react';
import { PokemonDetail } from '../pokemon/interfaces/PokemonDetail';
import { getPokemonsDetails } from '../pokemon/services/getPokemonDetails';
import { listPokemon, PokemonListInterface } from '../pokemon/services/listPokemon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Container, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';



interface PokedexProps {

}

const Pokedex: React.FC<PokedexProps> = () => {
  const [pokemons, setPokemons] = useState<PokemonListInterface[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<PokemonListInterface | undefined>(undefined);
  const [selectedPokemonsDetails, setSelectedPokemonsDetails] = useState<PokemonDetail | undefined>(undefined);


  useEffect(() => {
    listPokemon()
      .then((response) => setPokemons(response.results))
  }, []);

  useEffect(() => {

    if (!selectedPokemons) return

    getPokemonsDetails(selectedPokemons.name)
      .then((response) => setSelectedPokemonsDetails(response))
    // effect
    // return () => {
    //   cleanup
    // }
  }, [selectedPokemons]);

  return (
    <div>

      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Pokedex
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <div style={{ marginTop: 16 }}>
          <Grid container spacing={2}>
            {pokemons.map((pokemon) => (
              <>
                <Grid item xs={6} lg={3}>
                  <Card  variant="outlined">
                    <CardContent>
                      <Typography  color="textSecondary" gutterBottom>
                        {pokemon.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => setSelectedPokemons(pokemon)} size="small">Abrir</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            ))}
          </Grid>
          Pokemons:


          <h2>
            Pokemon Selecionado: <br />
            {selectedPokemons?.name || ' Nenhum Pokemon Selecionado'}
          </h2>

          {JSON.stringify(selectedPokemonsDetails, undefined, 2)}
        </div>
      </Container>
    </div>
  );
};

export default Pokedex;