import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
@Injectable()
export class DatabaseProvider {
  database:any;
  constructor(public sqlite:SQLite) {
  }

  openDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db;
        db.executeSql('CREATE TABLE IF NOT EXISTS actividad(id INTEGER PRIMARY KEY, fecha VARCHAR(12), tiempo VARCHAR(20), distancia VARCHAR(12), calorias VARCHAR(12), denominacion VARCHAR(30), velocidad VARCHAR(20))', {})
          .then(() => console.log('Executed SQL Tabla actividad'))
          .catch(e => console.log(e));

        db.executeSql('CREATE TABLE IF NOT EXISTS detalle(id INTEGER(10) PRIMARY KEY, idactividad INTEGER(10), tiempo VARCHAR(20), tiempoParcial VARCHAR(20), distancia VARCHAR(20), velocidad VARCHAR(20), latitud VARCHAR(50), longitud VARCHAR(20))', {})
          .then(() => console.log('Executed SQL Tabla actividad_detalle'))
          .catch(e => console.log(e));

        db.executeSql('CREATE TABLE IF NOT EXISTS registro(id INTEGER(10) PRIMARY KEY, nombre VARCHAR(50), apellido VARCHAR(50), fecha VARCHAR(20), correo VARCHAR(30), clave VARCHAR(30), pais VARCHAR(50), provincia VARCHAR(20),edad INTEGER(3),altura VARCHAR(20), peso VARCHAR(20))', {})
          .then(() => console.log('Executed SQL Tabla registro'))
          .catch(e => console.log(e));

        db.executeSql('CREATE TABLE IF NOT EXISTS config(id INTEGER(10) PRIMARY KEY, version VARCHAR(50), loguedo VARCHAR(50), sync VARCHAR(20))', {})
          .then(() => console.log('Executed SQL Tabla config'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }
  openWithConfig(){
    return this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          db.executeSql('CREATE TABLE IF NOT EXISTS actividad(id INTEGER PRIMARY KEY, fecha VARCHAR(12), tiempo VARCHAR(20), distancia VARCHAR(12), calorias VARCHAR(12), denominacion VARCHAR(30), velocidad VARCHAR(20))', {})
            .then(() => console.log('Executed SQL Tabla actividad'))
            .catch(e => console.log(e));
  
          db.executeSql('CREATE TABLE IF NOT EXISTS detalle(id INTEGER(10) PRIMARY KEY, idactividad INTEGER(10), tiempo VARCHAR(20), tiempoParcial VARCHAR(20), distancia VARCHAR(20), velocidad VARCHAR(20), latitud VARCHAR(50), longitud VARCHAR(20))', {})
            .then(() => console.log('Executed SQL Tabla actividad_detalle'))
            .catch(e => console.log(e));
  
          db.executeSql('CREATE TABLE IF NOT EXISTS registro(id INTEGER(10) PRIMARY KEY, nombre VARCHAR(50), apellido VARCHAR(50), fecha VARCHAR(20), correo VARCHAR(30), clave VARCHAR(30), pais VARCHAR(50), provincia VARCHAR(20),edad INTEGER(3),altura VARCHAR(20), peso VARCHAR(20))', {})
            .then(() => console.log('Executed SQL Tabla registro'))
            .catch(e => console.log(e));
  
          db.executeSql('CREATE TABLE IF NOT EXISTS config(id INTEGER(10) PRIMARY KEY, version VARCHAR(50), loguedo VARCHAR(50), sync VARCHAR(20))', {})
            .then(() => console.log('Executed SQL Tabla config'))
            .catch(e => console.log(e));

          return this.getConfig(); 
        })
        .catch(e => console.log(e));
  }
  saveRegistroPerfil(formulario){
        let data = [formulario.mail, formulario.nombre, formulario.apellido, formulario.peso, formulario.altura, formulario.fechaNacimiento, formulario.pais, formulario.provincia, formulario.edad];
        console.log('item detalle', formulario);
        return this.database.executeSql('INSERT INTO registro(correo,nombre,apellido,peso,altura,fecha,pais,provincia,edad) VALUES (?,?,?,?,?,?,?,?,?)', data).then((result) => {
            console.log(result);
            return result;
        }).catch(e => console.log(e));
  }
  saveActividad(params): any{
      console.log(params);
      let data = [params.inicio, params.tiempo, params.distancia, params.calorias, params.denominacion, params.velocidad];
      return this.database.executeSql('INSERT INTO actividad(fecha,tiempo,distancia,calorias,denominacion,velocidad) VALUES (?,?,?,?,?,?)', data)
      .then((result) => {
          console.log(result);
          return result;
      })
      .catch(e => console.log(e));
  }
  saveConf(){
    let date = new Date();
    let data = [date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(), "0.0.1", "Si"];
    if(this.database){
        this.database.executeSql('INSERT INTO config(sync,version,loguedo) VALUES (?,?,?)', data)
        .then((result) => {
            console.log('save config',result);
        })
        .catch(e => console.log(e));
    }

}
  saveDetalleActividad(viaje, rowId){
      for(let item of viaje.detalle){
          let data = [rowId, item.tiempo, item.tiempoTranscurrido,item.distancia,item.velocidad,item.latitud,item.longitud ];
          console.log('item detalle', item);
          if(this.database){
              this.database.executeSql('INSERT INTO detalle(idactividad,tiempo,tiempoParcial,distancia,velocidad,latitud,longitud) VALUES (?,?,?,?,?,?,?)', data)
              .then((result) => {
                  console.log(result);

              })
              .catch(e => console.log(e));
          }
      }

  }
  getActividades(){
    return this.database.executeSql('SELECT * FROM actividad ORDER BY actividad.id desc ', {})
    .then((result) => {
        let resultSet = [];
        if(result.rows.length > 0){
            for(var index = 0; index < result.rows.length; index++){
                console.log('item', result.rows.item(index));
                resultSet.push(result.rows.item(index));
            }
        }
        return resultSet;
    })
    .catch(e => console.log(e));
  }
  getDetalleActividad(id){
    return this.database.executeSql('SELECT * FROM detalle WHERE idactividad = ? ORDER BY id asc ', [id])
    .then((result) => {
        console.log(result);
        let resultSet = [];
        if(result.rows.length > 0){
            for(var index = 0; index < result.rows.length; index++){
                resultSet.push(result.rows.item(index));
            }
        }
        return resultSet;
    })
    .catch(e => console.log(e));
  }
  getConfig(){
    return this.database.executeSql('SELECT * FROM config LIMIT 1 ', {})
    .then((result) => {
        
        let resultSet = [];
        if(result.rows.length > 0){
            for(var index = 0; index < result.rows.length; index++){
                resultSet.push(result.rows.item(index));
            }
        }
        return resultSet;
    })
    .catch(e => console.log(e));
  }
  getPerfil(){
    return this.database.executeSql('SELECT * FROM registro LIMIT 1 ', {})
    .then((result) => {
        let resultSet = [];
        if(result.rows.length > 0){
            for(var index = 0; index < result.rows.length; index++){
                resultSet.push(result.rows.item(index));
            }
        }
        return resultSet;
    })
    .catch(e => console.log(e));
  }


}
