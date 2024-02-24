package com.carProject.biz.carcom.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.carProject.biz.car.CarVO;
import com.carProject.biz.carcom.CarcomVO;

@Repository
public class CarcomDAOMybatis {
	 @Autowired
	 private SqlSessionTemplate mybatis;
	 
	 public void insertCarcom(CarcomVO vo)
	 {
		 System.out.println("Mybatis로 완료 입력 ");
		 mybatis.insert("CarcomDAO.insertCarcom",vo);
		 
	 }
	 
	 public void createCarcom(CarcomVO vo)
	 {
		 System.out.println("출근- 완료 테이블 생성 ");
		 mybatis.update("CarcomDAO.createCarcom",vo);
		 
	 }
	 public void dropCarcom(CarcomVO vo)
	 {
		 System.out.println("퇴근- 완료 테이블 삭제");
		 mybatis.update("CarcomDAO.dropCarcom",vo);
	 }
	 
	 public List<CarcomVO> getCarcomList(CarcomVO vo)
	 {
		 System.out.println("마이바티스로 완료 목록 불러옴 ");
		 return mybatis.selectList("CarcomDAO.getCarcomList", vo);
	 }
}
