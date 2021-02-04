import { wait, getData } from "./tool-functions";

export const request = (url, options) => {
  return fetch(`${url}`, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};

export const getPekemonExtendedInfo = async(id) => {
  const extendedInfoServerObj = await request(`http://pokeapi.co/api/v2/pokemon/${id}`);

  const pekemonTypeFromServer = extendedInfoServerObj.types.map(item => item.type.name);

  const preparedExtInfo = {
    name: extendedInfoServerObj.name, 
    id: id,
    pekemonType: pekemonTypeFromServer,
    attack: extendedInfoServerObj.stats[1].base_stat,
    defense: extendedInfoServerObj.stats[2].base_stat,
    hp: extendedInfoServerObj.stats[0].base_stat,
    spAttack: extendedInfoServerObj.stats[3].base_stat,
    spDefense: extendedInfoServerObj.stats[4].base_stat,
    speed: extendedInfoServerObj.stats[5].base_stat,
    weight: extendedInfoServerObj.weight,
    totalMoves: extendedInfoServerObj.moves.length,
    picture: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`
  }

  return preparedExtInfo;
} 

export const getMarkUpInfo = async(url) => {
  await wait(200);
  const pekemonNames = await request(url).then((gotten) => gotten.results.map((pekemon) => pekemon.name));
  const linksToExtandedInfo = await request(url).then((gotten) => gotten.results.map((pekemon) => pekemon.url) );
  const typesofPekemons = (await getData(linksToExtandedInfo)).map(item => item.types.map(item => item.type.name));
  const pekemonIds = (await getData(linksToExtandedInfo)).map(item => item.id);


  const pekemonCardInfo = pekemonNames.map((item, id) => {

    return {
      name: item,
      types: typesofPekemons[id],
      id: pekemonIds[id],
    }
  }).map(item => ({...item, picture: `https://pokeres.bastionbot.org/images/pokemon/${item.id}.png`}))

  const info = {
    next: await request(url).then((gotten) => gotten.next),
    pekemonCardInfo,
  }

  return info;
}

export const getPekemonTypes = async() => {
  return await request("https://pokeapi.co/api/v2/type?limit=999").then((gotten => gotten.results.map(item => item.name)));
}