
const OptionList = ({ options }) => {
	

	return (
		<>
			{
				options.results.map((item)=>
                (<option value={item.id} key={item.id}>{item.title}</option>)
            )
			}
			
		</>
	);
};

export default OptionList;
