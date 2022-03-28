import { database } from './../data/data.store';
import { IResolvers } from '@graphql-tools/utils';
import _ from 'lodash';

const mutation: IResolvers = {
  Mutation: {
    cursoNuevo(__: void, { curso }): any {
      const itemCurso = {
        id: String(database.cursos.length + 1),
        title: curso.title,
        description: curso.description,
        clases: curso.clases,
        time: curso.time,
        level: curso.level,
        logo: curso.logo,
        path: curso.path,
        teacher: curso.teacher,
        reviews: [],
      };
      if (
        database.cursos.filter((itemCurs) => itemCurs.title === itemCurso.title)
          .length === 0
      ) {
        database.cursos.push(itemCurso);
        return itemCurso;
      }
      return {
        id: '-1',
        title: `There is already a course with this title`,
        description: '',
        clases: -1,
        time: 0.0,
        level: 'ALL',
        logo: '',
        path: '',
        teacher: '',
        reviews: [],
      };
    },
    modificarCurso(__: void, { curso }): any {
      const elementoExiste = _.findIndex(database.cursos, function (o) {
        return o.id === curso.id;
      });
      if (elementoExiste > -1) {
        const valoraciones = database.cursos[elementoExiste].reviews;
        curso.reviews = valoraciones;
        database.cursos[elementoExiste] = curso;
        return curso;
      }
      return {
        id: '-1',
        title: `This course doesn't exist in the database`,
        description: '',
        clases: -1,
        time: 0.0,
        level: 'ALL',
        logo: '',
        path: '',
        teacher: '',
        reviews: [],
      };
    },
    eliminarCurso(__: void, { id }): any {
      const borrarCurso = _.remove(database.cursos, function (curso) {
        return curso.id === id;
      });
      if (borrarCurso[0] === undefined) {
        return {
          id: '-1',
          title: `This course can't be remove because this course doesn't exist in the database`,
          description: '',
          clases: -1,
          time: 0.0,
          level: 'ALL',
          logo: '',
          path: '',
          teacher: '',
          reviews: [],
        };
      }
      return borrarCurso[0];
    },
  },
};

export default mutation;
