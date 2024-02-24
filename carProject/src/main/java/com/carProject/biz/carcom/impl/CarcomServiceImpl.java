package com.carProject.biz.carcom.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carProject.biz.carcom.CarcomVO;
@Service("carcomService")
public class CarcomServiceImpl implements CarcomService {

@Autowired
private CarcomDAOMybatis carcomDAO;
	
	@Override
	public void insertCarcom(CarcomVO vo) {
		carcomDAO.insertCarcom(vo);
		
	}

	@Override
	public void updateCarcom(CarcomVO vo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteCarcom(CarcomVO vo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<CarcomVO> getCarcomList(CarcomVO vo) {
		
		return carcomDAO.getCarcomList(vo);
	}

	@Override
	public void createCarcom(CarcomVO vo) {
		carcomDAO.createCarcom(vo);
		
	}

	@Override
	public void dropCarcom(CarcomVO vo) {
		carcomDAO.dropCarcom(vo);
		
	}

}
