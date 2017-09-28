export default function(countryName, rank, language, armsType, yrs, bullets) {
  if (language === 'FI') {
    let arms;
    switch (armsType) {
      case 'total':
        arms = 'aseiden';
        break;
      case 'CountryMilatary':
        arms = 'sotatuotteiden';
        break;
      case 'CivilianArmsTotal':
        arms = 'siviiliaseiden';
        break;
    }
    if (parseInt(rank, 10) === 1) {
      return `<span style="font-weight:700">${countryName}</span> oli <span style='font-weight:700'>suurin ${arms}</span> tuoja Suomesta vuonna <span style='font-weight:700'>${yrs}</span>.<br><br>${bullets}`;
    } else {
      return `<span style="font-weight:700">${countryName}</span> oli <span style='font-weight:700'>${rank}.</span> suurin <span style='font-weight:700'>${arms}</span> tuoja Suomesta vuonna <span style='font-weight:700'>${yrs}</span>.<br><br>${bullets}`;
    }
  } else {
    let arms, text;
    switch (armsType) {
      case 'total':
        arms = 'total arms';
        break;
      case 'CountryMilatary':
        arms = 'military material';
        break;
      case 'CivilianArmsTotal':
        arms = 'civilian arms';
        break;
    }
    switch (parseInt(rank, 10)) {
      case 1:
        text = `<span style="font-weight:700">${countryName}</span> was the <span style='font-weight:700'>largest ${arms}</span> importer from Finland in <span style='font-weight:700'>${yrs}</span>.<br><br>${bullets}`;
        break;
      case 2:
        text = `<span style="font-weight:700">${countryName}</span> was the <span style='font-weight:700'>${rank}nd</span> largest <span style='font-weight:700'>${arms}</span> importer from Finland in <span style='font-weight:700'>${yrs}</span>.<br><br>${bullets}`;
        break;
      case 3:
        text = `<span style="font-weight:700">${countryName}</span> was the <span style='font-weight:700'>${rank}rd</span> largest <span style='font-weight:700'>${arms}</span> importer from Finland in <span style='font-weight:700'>${yrs}</span>.<br><br>${bullets}`;
        break;
      default:
        text = `<span style="font-weight:700">${countryName}</span> was the <span style='font-weight:700'>${rank}th</span> largest <span style='font-weight:700'>${arms}</span> importer from Finland in <span style='font-weight:700'>${yrs}</span>.<br><br>${bullets}`;
        break;
    }
    return text;
  }
}
