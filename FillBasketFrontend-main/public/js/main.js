import React, { useEffect } from 'react';
import $ from 'jquery'; // Import jQuery

const YourComponent = () => {
    useEffect(() => {
        // Spinner
        const spinner = () => {
            setTimeout(() => {
                if ($('#spinner').length > 0) {
                    $('#spinner').removeClass('show');
                }
            }, 1);
        };
        spinner(0);

        // Fixed Navbar
        const handleScroll = () => {
            if ($(window).width() < 992) {
                if ($(window).scrollTop() > 55) {
                    $('.fixed-top').addClass('shadow');
                } else {
                    $('.fixed-top').removeClass('shadow');
                }
            } else {
                if ($(window).scrollTop() > 55) {
                    $('.fixed-top').addClass('shadow').css('top', -55);
                } else {
                    $('.fixed-top').removeClass('shadow').css('top', 0);
                }
            }
        };
        $(window).scroll(handleScroll);

        // Back to top button
        const handleBackToTopScroll = () => {
            if ($(window).scrollTop() > 300) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        };
        $(window).scroll(handleBackToTopScroll);

        const handleBackToTopClick = () => {
            $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
            return false;
        };
        $('.back-to-top').click(handleBackToTopClick);

        // Modal Video
        $(document).ready(() => {
            let $videoSrc;
            $('.btn-play').click(() => {
                $videoSrc = $(this).data('src');
            });

            $('#videoModal').on('shown.bs.modal', (e) => {
                $('#video').attr('src', `${$videoSrc}?autoplay=1&amp;modestbranding=1&amp;showinfo=0`);
            });

            $('#videoModal').on('hide.bs.modal', (e) => {
                $('#video').attr('src', $videoSrc);
            });
        });

        // Product Quantity
        const handleQuantityChange = (button) => {
            const oldValue = button.parent().parent().find('input').val();
            let newVal;
            if (button.hasClass('btn-plus')) {
                newVal = parseFloat(oldValue) + 1;
            } else {
                newVal = oldValue > 0 ? parseFloat(oldValue) - 1 : 0;
            }
            button.parent().parent().find('input').val(newVal);
        };

        $('.quantity button').on('click', function () {
            handleQuantityChange($(this));
        });
    }, []);

    return (
        <div>
            {/* Your JSX content here */}
        </div>
    );
};

export default YourComponent;
