export default function calcPercentageCompleted(user) {
    // user will be user document
    
    if(!user) return;
    const portfolio = user.portfolio;
    if(!portfolio || !portfolio.about) {
        return 0;
***REMOVED***

    // console.log(portfolio);
    var num_fields_provided = 0  

    num_fields_provided += 2; // for fields which are required true

    if(portfolio.about.lastname) num_fields_provided += 1;
    if(portfolio.about.imgUrl) num_fields_provided += 1;

    num_fields_provided += Math.min(3***REMOVED*** portfolio.about.profile_links.length) + Math.min(3***REMOVED*** portfolio.experiences.length) +  Math.min(3***REMOVED*** portfolio.skills.length);

    return Math.floor(num_fields_provided * 100 / 13);
}