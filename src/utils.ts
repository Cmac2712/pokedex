export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getPokemonDescription = (pokemonData: any): string[] => {
  const name = pokemonData?.species?.name;
  const habitat = pokemonData?.habitat?.name;
  const type = pokemonData?.types[0].type.name;
  const exp = pokemonData?.base_experience;
  let desc = [];

  if (type) {
    desc.push(`${capitalize(name)} is a ${type} type Pokemon.`);
  }

  if (exp) {
    desc.push(`It has a base experience of ${exp}.`);
  }

  if (habitat) {
    desc.push(`This pokemon is found in the ${habitat} habitat.`);
  }

  return desc;
};
