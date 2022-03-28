import { IResolvers } from '@graphql-tools/utils';
import { database } from './../data/data.store';

const query: IResolvers = {
  Query: {
    estudiantes(): any {
      return database.estudiantes;
    },
    estudiante(__: void, { id }): any {
      const result = database.estudiantes.filter(
        (estudiante) => estudiante.id === id
      )[0];
      if (result === undefined) {
        return {
          id: -1,
          name: `There is not result for student with selected ID: ${id}`,
          email: '',
          courses: [],
        };
      }
      return result;
    },
    cursos(): any {
      return database.cursos;
    },
    curso(__: void, { id }): any {
      const result = database.cursos.filter((curso) => curso.id === id)[0];
      if (result === undefined) {
        return {
          id: -1,
          title: `There is not result for course with selected ID: ${id}`,
          description: '',
          clases: -1,
          time: 0.0,
          logo: '',
          level: 'ALL',
          path: '',
          teacher: '',
          reviews: [],
        };
      }
      return result;
    },
  },
};

export default query;
