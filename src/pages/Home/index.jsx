import React, { useState } from "react";
import { useSelector } from 'react-redux';

import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';

import { Container, Carousel, Search, Logo, Wrapper, CarouselTitle } from './styles';
import logo from "../../assets/logo.svg";
import restaurante from "../../assets/restaurante-fake.png";
import { Card, RestaurantCard, Modal, Map } from "../../components";


const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const [modalOpened, setModalOpened] = useState(true);
    const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true,
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setQuery(inputValue);
        }
    };


    return (
        <Wrapper>
            <Container>
                <Search>
                    <Logo src={logo} alt="Logo do site de busca de restaurantes" />
                    <TextField
                        label='Pesquisar Restaurantes'
                        outlined
                        trailingIcon={<MaterialIcon role="button" icon="search" />}>
                        <Input 
                            value={inputValue} 
                            onKeyPress={handleKeyPress} 
                            onChange={(e) => setInputValue(e.target.value)} 
                        />
                    </TextField>
                    <CarouselTitle>Resultado</CarouselTitle>
                    <Carousel {...settings}>
                        {restaurants.map((restaurant) => (
                            <Card
                                key={restaurant.place_id}
                                photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante} 
                                title={restaurant.name} 
                            />
                        ))}
                    </Carousel>
                </Search>
                {restaurants.map((restaurant) => (
                    <RestaurantCard restaurant={restaurant} />
                ))}
            </Container>
            <Map query={query} />
            {/* Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)} */}
        </Wrapper>
    );
};

export default Home;