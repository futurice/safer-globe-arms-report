import formatEuros from './formatEuros';

export default function(
  countryName,
  rank,
  language,
  armsType,
  yrs,
  def,
  civ,
  totalExport,
) {
  if (rank == 0) {
    return '';
    // return `<span style='font-style: italic'>${bullets}</span>`;
  }
  if (language === 'FI') {
    let arms;
    let percent;
    switch (armsType) {
      case 'total':
        arms = 'aseiden';
        percent = (def + civ) * 100 / totalExport[0][yrs]['Total'];
        break;
      case 'CountryMilatary':
        arms = 'sotatuotteiden';
        percent = def * 100 / totalExport[0][yrs]['Military'];
        break;
      case 'CivilianArmsTotal':
        arms = 'siviiliaseiden';
        percent = civ * 100 / totalExport[0][yrs]['Civilian'];
        break;
    }
    if (armsType != 'total') {
      if (parseInt(rank, 10) === 1) {
        return `<span style="font-weight:700">${countryName}</span> oli <span style='font-weight:700'>suurin ${arms}</span> tuoja Suomesta vuonna <span style='font-weight:700'>${yrs}</span> (<span style="font-weight:700">${percent.toFixed(
          2,
        )}%</span> Suomen ${arms} viennistä)`;
      } else {
        return `<span style="font-weight:700">${countryName}</span> oli <span style='font-weight:700'>${rank}.</span> suurin <span style='font-weight:700'>${arms}</span> tuoja Suomesta vuonna <span style='font-weight:700'>${yrs}</span> (<span style="font-weight:700">${percent.toFixed(
          2,
        )}%</span> Suomen ${arms} viennistä)`;
      }
    } else {
      if (parseInt(rank, 10) === 1) {
        return `<span style="font-weight:700">${countryName}</span> oli <span style='font-weight:700'>suurin ${arms}</span> tuoja Suomesta vuonna <span style='font-weight:700'>${yrs}</span> (<span style="font-weight:700">${percent.toFixed(
          2,
        )}%</span> Suomen ${arms} viennistä)<p>Siviiliaseiden tuonti Suomesta <span class = "civComment">${formatEuros(
          civ,
        )}</span></p><p>Sotatuotteiden tuonti Suomesta <span class = "defComment">${formatEuros(
          def,
        )}</span></p>`;
      } else {
        return `<span style="font-weight:700">${countryName}</span> oli <span style='font-weight:700'>${rank}.</span> suurin <span style='font-weight:700'>${arms}</span> tuoja Suomesta vuonna <span style='font-weight:700'>${yrs}</span> (<span style="font-weight:700">${percent.toFixed(
          2,
        )}%</span> Suomen ${arms} viennistä)<p>Siviiliaseiden tuonti Suomesta <span class = "civComment">${formatEuros(
          civ,
        )}</span></p><p>Sotatuotteiden tuonti Suomesta <span class = "defComment">${formatEuros(
          def,
        )}</span></p>`;
      }
    }
  } else {
    let arms, text;
    let percent;
    switch (armsType) {
      case 'total':
        arms = 'total arms';
        percent = (def + civ) * 100 / totalExport[0][yrs]['Total'];
        break;
      case 'CountryMilatary':
        arms = 'military material';
        percent = def * 100 / totalExport[0][yrs]['Military'];
        break;
      case 'CivilianArmsTotal':
        arms = 'civilian arms';
        percent = civ * 100 / totalExport[0][yrs]['Civilian'];
        break;
    }
    if (armsType != 'total') {
      switch (parseInt(rank, 10)) {
        case 1:
          text = `<span style="font-weight:700">${countryName}</span> was the <span style='font-weight:700'>largest ${arms}</span> importer from Finland in <span style='font-weight:700'>${yrs}</span> (<span style="font-weight:700">${percent.toFixed(
            2,
          )}%</span> of all Finnish ${arms} export)`;
          break;
        case 2:
          text = `<span style="font-weight:700">${countryName}</span> was the <span style='font-weight:700'>${rank}nd</span> largest <span style='font-weight:700'>${arms}</span> importer from Finland in <span style='font-weight:700'>${yrs}</span> (<span style="font-weight:700">${percent.toFixed(
            2,
          )}%</span> of all Finnish ${arms} export)`;
          break;
        case 3:
          text = `<span style="font-weight:700">${countryName}</span> was the <span style='font-weight:700'>${rank}rd</span> largest <span style='font-weight:700'>${arms}</span> importer from Finland in <span style='font-weight:700'>${yrs}</span> (<span style="font-weight:700">${percent.toFixed(
            2,
          )}%</span> of all Finnish ${arms} export)`;
          break;
        default:
          text = `<span style="font-weight:700">${countryName}</span> was the <span style='font-weight:700'>${rank}th</span> largest <span style='font-weight:700'>${arms}</span> importer from Finland in <span style='font-weight:700'>${yrs}</span> (<span style="font-weight:700">${percent.toFixed(
            2,
          )}%</span> of all Finnish ${arms} export)`;
          break;
      }
    } else {
      switch (parseInt(rank, 10)) {
        case 1:
          text = `<span style="font-weight:700">${countryName}</span> was the <span style='font-weight:700'>largest ${arms}</span> importer from Finland in <span style='font-weight:700'>${yrs}</span> (<span style="font-weight:700">${percent.toFixed(
            2,
          )}%</span> of all Finnish total arms export)<p>Civilian Arm import from Finland is <span class = "civComment">${formatEuros(
            civ,
          )}</span></p><p>Military Arm import from Finland is <span class = "defComment">${formatEuros(
            def,
          )}</span></p>`;
          break;
        case 2:
          text = `<span style="font-weight:700">${countryName}</span> was the <span style='font-weight:700'>${rank}nd</span> largest <span style='font-weight:700'>${arms}</span> importer from Finland in <span style='font-weight:700'>${yrs}</span> (<span style='font-weight:700'>${percent.toFixed(
            2,
          )}%</span> of all Finnish total arms export)<p>Civilian Arm import from Finland is <span class = "civComment">${formatEuros(
            civ,
          )}</span></p><p>Military Arm import from Finland is <span class = "defComment">${formatEuros(
            def,
          )}</span></p>`;
          break;
        case 3:
          text = `<span style="font-weight:700">${countryName}</span> was the <span style='font-weight:700'>${rank}rd</span> largest <span style='font-weight:700'>${arms}</span> importer from Finland in <span style='font-weight:700'>${yrs}</span> (<span style='font-weight:700'>${percent.toFixed(
            2,
          )}%</span> of all Finnish total arms export)<p>Civilian Arm import from Finland is <span class = "civComment">${formatEuros(
            civ,
          )}</span></p><p>Military Arm import from Finland is <span class = "defComment">${formatEuros(
            def,
          )}</span></p>`;
          break;
        default:
          text = `<span style="font-weight:700">${countryName}</span> was the <span style='font-weight:700'>${rank}th</span> largest <span style='font-weight:700'>${arms}</span> importer from Finland in <span style='font-weight:700'>${yrs}</span> (<span style='font-weight:700'>${percent.toFixed(
            2,
          )}%</span> of all Finnish total arms export)<p>Civilian Arm import from Finland is <span class = "civComment">${formatEuros(
            civ,
          )}</span></p><p>Military Arm import from Finland is <span class = "defComment">${formatEuros(
            def,
          )}</span></p>`;
          break;
      }
    }
    return text;
  }
}
