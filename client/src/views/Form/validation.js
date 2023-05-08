const validation = (info) => {
    const errors = {};
    if(info.name.length < 4 || info.name.length > 20){
        errors.name = "El nombre de la actividad debe tener entre 4 y 20 cracteres"
    };
    if(/\d/.test(info.name)){
        errors.name = "El nombre de  la actividad no puede contenet números"
    }
    if (info.countries.length < 1){
        errors.countries = "Debe seleccionar por lo menos un país"
    }
    return errors;
}

export default validation;