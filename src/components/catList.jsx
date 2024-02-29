
const CatList = ({ options }) => {
	

	return (
		<>
			{
				options.map((item)=>
                (<option value={item.title} key={item.id}>{item.title}</option>)
            )
			}
			
		</>
	);
};

export default CatList;
