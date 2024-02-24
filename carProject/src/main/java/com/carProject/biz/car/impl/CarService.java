package com.carProject.biz.car.impl;

import java.util.List;

import com.carProject.biz.car.CarVO;

public interface CarService {

	
	void insertCar(CarVO vo);
	
	void updateCar(CarVO vo);
	
	void deleteCar(CarVO vo);
	
	void createCar(CarVO vo);
	
	void dropCar(CarVO vo);
	
	List<CarVO> getCarList(CarVO vo);
	
}
