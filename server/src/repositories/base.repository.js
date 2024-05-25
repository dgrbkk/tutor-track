class BaseRepository {
  constructor(context) {
    this.context = context;
  }

  getAll() {
    return this.context.findMany();
  }

  getOne(id) {
    return this.context.findUnique({where: {id}});
  }

  createInstance(data) {
    return this.context.create({data: data});
  }

  updateInstanceById(data, id) {
    return this.context.update({where: {id}, data: data});
  }

  deleteInstanceById(id) {
    return this.context.delete({where: {id}});
  }

}
export default BaseRepository;
