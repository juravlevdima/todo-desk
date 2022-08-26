import { makeAutoObservable } from 'mobx'

export default class DeskStore {
  desks = ['test', 'abc', 'cde']

  constructor (){
    makeAutoObservable(this)
  }
}
