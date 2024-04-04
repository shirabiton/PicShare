import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import NewCard from './NewCard';


export default function BySearch() {

    const location = useLocation();
    const searchInput = new URLSearchParams(location.search);
    const input = searchInput.get('input');

    const sharings = useSelector((state) => state.sharings.sharingsList);
    const filteredSharings = sharings && sharings.filter(sharing =>
        sharing.title.toLowerCase().includes(input.toLowerCase())
    );

    return (
        <>
            {filteredSharings.length > 0 ? (
                <>
                    <p style={{ textAlign: 'center', marginBottom: '30vh', marginTop: '11vh' }}>נמצאו {filteredSharings.length} תוצאות לחיפוש: {input}</p>
                </>
            ) : (
                <p style={{ textAlign: 'center', marginBottom: '30vh', marginTop: '11vh' }}>לא נמצאו תוצאות לחיפוש: {input}</p>
            )}

            <NewCard sharings={filteredSharings} type={0}/>

        </>
    )
}
