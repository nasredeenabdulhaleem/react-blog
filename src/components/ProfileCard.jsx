const ProfileCard = ({ author, holder }) => {
    return (
        <div className="rounded-lg shadow-lg overflow-hidden m-4 max-w-xs mx-auto">
            <img className="w-full h-56 object-cover object-center" src={holder} alt="profile" />
            <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-900">{author.title}</h2>
                <p className="text-gray-700">{author.authorname}</p>
                <ul className="mt-4 text-sm text-gray-600">
                    <li>Nationality: Nigeria</li>
                    <li>Article Count: 10</li>
                    <li>NickName: Corporate sheikh</li>
                    <li>Facebook: {author.facebook_link}</li>
                    <li>Twitter: {author.twitter_link}</li>
                    <li>Instagram: {author.instagram_link}</li>
                    <li>LinkedIn: {author.linkedin_link}</li>
                </ul>
            </div>
            <div className="p-4 bg-gray-100 border-t border-gray-200">
                <button onClick={(e) => { e.preventDefault(); }} className='w-full py-2 px-3 text-center bg-blue-600 text-white font-semibold rounded hover:bg-blue-500'>Update Profile</button>
            </div>
        </div>
    );
}

export default ProfileCard;