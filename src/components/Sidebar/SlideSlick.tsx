import { Container, Flex, Image, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SlideProps {
    url: string;
}

export const SlideSlick = ({ url }: SlideProps) => {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // prevArrow: <></>,
        // nextArrow: <></>,
    };
    return (
        <Container
            borderRadius={"md"}
        >
            <Slider {...settings}>
                <Flex
                    align='center'
                    justify='center'
                    textAlign='center'
                    borderRadius={"md"}
                    overflow={"hidden"}
                    px={2}
                >
                    <Image
                        objectFit='cover'
                        src={url}
                    />
                </Flex>
            </Slider>
        </Container>

    )
}