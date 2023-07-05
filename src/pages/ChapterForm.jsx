import Bg_form from '/img/Bg_form.png';
import ButtonSend from '../components/ButtonSend'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChapterForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');
    const [pages, setPages] = useState([]);
    const [pagesError, setPagesError] = useState('');
    const [order, setOrder] = useState(null);

    const fetchChapter = (chapterData) => {

        fetch('http://localhost:8080/api/chapters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chapterData),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();

                } else {
                    throw new Error('Error en la solicitud POST');
                }
            })
            .then(data => {
                navigate('../')
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleTitle = async (event) => {
        setTitle(event.target.value);
        setTitleError(null)
    }

    const handlePages = (event) => {
        const value = event.target.value;
        const pagesArray = value.split(',').map((page) => page.trim());
        setPages(pagesArray);
        setPagesError('');
    };

    const handleOrder = (event) => {
        setOrder(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (title.trim() === '') {
            setTitleError('Title cannot be empty');
            return;
        }

        if (pages.length === 0) {
            setPagesError('Pages number cannot be 0');
            return;
        }

        const chapterData = {
            "manga_id": '64643dc658943f32ad2af23f',
            "title": title,
            "cover_photo": 'https://i.postimg.cc/W1cVYyzc/shingeki-no-kyojin-009-01.png',
            "pages": pages,
            "order": order,
        };
        fetchChapter(chapterData);
    };

    return (
        <main className="w-full min-h-screen flex justify-center bg-[#EBEBEB] pb-[30px]">
            <div className="w-full lg:w-1/2 min-h-screen flex flex-col items-center justify-center pt-[90px] ">
                <h1 className='font-poppins leading-10 font-normal text-4xl mb-[30px]'>New Chapter</h1>
                <form className='flex flex-col items-center w-[280px] md:w-[350px] lg:w-[420px] text-base gap-[12px]'>
                    <input onChange={handleTitle} className='w-full border border-transparent border-b-[#424242] bg-[#EBEBEB] px-4 py-2' type="text" placeholder="Insert title" id="title" value={title} />
                    {titleError && <p>{titleError}</p>}
                    <input onChange={handleOrder} className='w-full border border-transparent border-b-[#424242] bg-[#EBEBEB] px-4 py-2' type="text" placeholder="Insert order" id="order" value={order} />
                    <input onChange={handlePages} className='w-full border border-transparent border-b-[#424242] bg-[#EBEBEB] px-4 py-2' type="text" placeholder="Insert pages" id="pages" value={pages} />
                    {pagesError && <p>{pagesError}</p>}
                    <ButtonSend onClick={handleSubmit} />
                </form>
            </div>
            <img className='hidden lg:block min-h-[640px] max-h-screen w-1/2 object-cover' src={Bg_form} alt='Perfil' />
        </main>
    )
}