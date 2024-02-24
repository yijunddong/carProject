package com.carProject.biz.car.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carProject.biz.car.CarVO;

@Service("carService")
public class CarServiceImpl implements CarService {
 
	@Autowired
	private CarDAOMybaits carDAO;
	
	@Override
	public void insertCar(CarVO vo) {
	carDAO.insertCar(vo);	
		
	}

	@Override
	public void updateCar(CarVO vo) {
	    carDAO.updateCar(vo);
		
	}

	@Override
	public void deleteCar(CarVO vo) {
		carDAO.deleteCar(vo);
		
	}

	@Override
	public List<CarVO> getCarList(CarVO vo) {
		return carDAO.getCarList(vo);
	}

	@Override
	public void createCar(CarVO vo) {
       carDAO.createCar(vo);
		
	}

	@Override
	public void dropCar(CarVO vo) {
		carDAO.dropCar(vo);
		
	}

}
