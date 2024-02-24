package com.carProject.biz.car.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.carProject.biz.car.CarVO;

@Repository
public class CarDAOMybaits {
 @Autowired
 private SqlSessionTemplate mybatis;
 
 
 public void insertCar(CarVO vo)
 {
	 System.out.println("검사대기중 입력 ");
	 mybatis.insert("CarDAO.insertCar",vo);
	 
 }
 
 public void createCar(CarVO vo)
 {
	 System.out.println("출근- 접수 테이블 생성 ");
	 mybatis.update("CarDAO.createCar",vo);
	 
 }
 public void dropCar(CarVO vo)
 {
	 System.out.println("퇴근- 접수 테이블 삭제");
	 mybatis.update("CarDAO.dropCar",vo);
 }
 public List<CarVO> getCarList(CarVO vo)
 {
	 System.out.println("마이바티스로 접수목록 불러옴 ");
	 return mybatis.selectList("CarDAO.getCarList", vo);
 }
 public void deleteCar(CarVO vo)
 {
	 System.out.println("Mybatis로 검사완료 버튼입력 ");
	 mybatis.delete("CarDAO.deleteCar",vo);
 }
 public void updateCar(CarVO vo)
 {
	 System.out.println("Mybatis로 수정 버튼입력 ");
	 mybatis.delete("CarDAO.updateCar",vo);
 }

 
 
}
